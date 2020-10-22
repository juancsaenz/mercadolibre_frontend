/**
 * @author Camilo Sáenz
 * @file index.jsx
 * @description Detail Item Component
 */ 

// Dependencies
 import React, { Component } from "react";
 import { connect } from "react-redux";
 import Loader from "react-loader-spinner";

// Components
 import Item from "../Item";
 import Header from "../HeaderSearch";

// Constants
import { API_URL } from "../../constants";

// Actions
import { setItems, setSearch } from "../../store/actions";

//Style
import './style.scss';

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  async componentWillMount() {
    let urlParam = new URLSearchParams(this.props.location.search).get(
      "q"
    );
    if (urlParam !== null && urlParam !== this.props.search) {
        console.log('entro al if')
      await this.props.setSearch(urlParam);
      await this.getItems();
    }
  }

  async componentDidUpdate(prevProps, newState) {
    if (this.props.search !== prevProps.search) {
      await this.getItems();
    }
  }

  async getItems() {
    this.setState({ isLoading: true });
    try {
      let { search } = this.props;
      const response = await fetch(`${API_URL}/api/items?q=${search}`);
      console.log('response :>> ', response);
      let data = await response.json();
      await this.props.setItems(data);
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const items = this.props.items.length
    ? [this.props.items.map((item, index) => {
      return (
        <li key={index}>
              <Item item={item} />
            </li>
          );
        })]
        : [];

    if (this.state.isLoading) {
      return (
        <div>
          <Header />
          <Loader type="Circles" color="#3483FA" />;
        </div>
      );
    }

    if (items.length) {
      return (<div>
        <Header />
        <div className="main-container">
          <ul>{items}</ul>;
        </div>
        </div>)
    } else {
      let msg = this.props.noItems
        ? "No encontramos productos :("
        : "Busca productos, marcas y mas..";
      return (
        <div className="main-container">
          <h1>{msg}</h1>
        </div>
      );
    }
  }
}

export default connect(
  ({ items, search }) => {
    return { items, search };
  },
  { setItems, setSearch }
)(ListItems);