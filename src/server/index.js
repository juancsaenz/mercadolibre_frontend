import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import { matchRoutes } from "react-router-config";
import Loadable from 'react-loadable';

import configureStore from "../common/store/configureStore";
import renderer from "./renderer";
import routes from "../common/routes";

const app = express();
const PORT = process.env.PORT || 4000;
const itemsRoute = require('./api/items');

app.use(bodyParser.json());
app.use(express.static("build/public"));
app.use('/api/items', itemsRoute);
app.get("*", (req, res) => {
  console.log("app get", req.path);

  // const preloadedState = { counter: 6 };
  const store = configureStore();

  let promises = matchRoutes(routes, req.path).map( ({route, match}) => {
    // console.log(match.params)
    if (route.loadData) {
      return route.loadData(store, match.params)
    }
  });
  
  // console.log("promises1", promises);
  // res.send(renderer(req, store));
  // promises.map(promise => {
  //   //Be sure every promise resolved even if it being catch status
  //   return new Promise((resolve, reject) => {
  //     promise.then(resolve).catch(resolve);
  //   });
  // });

  promises = promises.filter(promise => promise !== undefined);

  // console.log("promises2", promises);
  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  }).catch(e => console.log("promise error", e));
})

Loadable.preloadAll().then( () => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
});
