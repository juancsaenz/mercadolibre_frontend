/**
 * @author Camilo Sáenz
 * @file index.jsx
 * @description HeaderSearch Component
 */

// Dependencies
import React from 'react';
import { Layout, Input } from 'antd';
import { withRouter, Link } from "react-router-dom";

// Assets
import LogoIcon from '../../assets/Logo_ML.png';

// Styles
import './styles.scss';

const { Header } = Layout;
const { Search } = Input;

/**
 * AppHeaderSearch Function component.
 * @return { Node } React node containing app header with search bar.
 */
export class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);

    this.searchItems = this.searchItems.bind(this);
  }

  searchItems(query) {
    this.props.history.push(`/items?q=${query}`);
  }

  render() {
    return (
      <div className="header-root">
        <div>
          <img
            src={LogoIcon}
            className='logo'
          />
        </div>
        <div className="searchBar">
          <Search
            placeholder="Nunca dejes de buscar"
            enterButton
            className="searchInput"
            onSearch={this.searchItems}
          />
        </div>
      </div>
    );
  }
};

export default withRouter(HeaderSearch);
