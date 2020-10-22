/**
 * @author Camilo Sáenz
 * @file index.spec.js
 * @description Unit test to HeaderSearch file
 */

// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Component
import HeaderSearch from '../index.js';

describe('<HeaderSearch />', () => {
  it('should render the component', () => {
    const renderedComponent = shallow(<HeaderSearch />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
