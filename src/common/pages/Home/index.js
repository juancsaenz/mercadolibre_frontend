import React, { Component } from "react";
import Header from "../../components/HeaderSearch";

class Home extends Component {
  render() {
    return(
      <div className="page home">
        <Header />
      </div>
    )
  }
}

export default { component: Home };
