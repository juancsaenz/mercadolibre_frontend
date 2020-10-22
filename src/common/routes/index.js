import Home from "../pages/Home";
import ListItems from "../components/ListItems"
import DetailItem from "../components/DetailItem"
import App from "../app";

export default [
  {
    path: '/',
    component: App,
    routes: [
      {
        component: ListItems,
        path: "/items",
      },
      {
        component: DetailItem,
        path: "/item/:id",
        exact: true
      },
      {
        ...Home,
        path: "/:initial?",
        exact: true
      }
    ]
  }
];