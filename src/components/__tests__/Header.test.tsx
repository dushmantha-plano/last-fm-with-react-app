import 'jest-styled-components';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Header from '../Header';
import React from 'react';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
describe('Test for Header Component', () => {
  test('Should render the component', () => {
    const wrapper = shallow(<Header />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
