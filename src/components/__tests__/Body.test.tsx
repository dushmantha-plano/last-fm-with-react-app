import 'jest-styled-components';
import Body from '../Body';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test for Body Component', () => {
  test('Should render the component', () => {
    const tree = renderer.create(<Body />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
