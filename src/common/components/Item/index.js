/**
 * @author Camilo Sáenz
 * @file index.jsx
 * @description Item Component
 */ 

// Dependencies
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectItem } from "../../store/actions";

// Assets
import shipping from "../../assets/ic_shipping.png"

//Styles
import './style.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.goToDetail = this.goToDetail.bind(this);
    console.log('props :>> ', props);
  }

  formatPrice(amount) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(amount);
  }

  goToDetail() {
    this.props.selectItem(this.props.item.id);
    this.props.history.push(`item/${this.props.item.id}`);
  }

  render() {
    return (
      <div onClick={this.goToDetail}>
        <section className="results-item">
          <section className="results-item__thumbnail">
            <img className="img" src={this.props.item.thumbnail} alt="" />
          </section>
          <section className="results-item__info">
            <h1 className="results-item__price">
                $
              {this.props.item.price}
              {this.props.item.free_shipping ? <img src={shipping} alt=""/> : ''}
            </h1>

            <p className="results-item__location">
              {this.props.item.address.city_name}
            </p>
            <h2 className="results-item__title">{this.props.item.title}</h2>
          </section>
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  {
    selectItem
  }
)(withRouter(Item));