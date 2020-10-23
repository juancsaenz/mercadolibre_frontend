/**
 * @author Camilo Sáenz
 * @file setupTest.js
 * @description Configure global adapter to unit test
 */

// Dependencies
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
