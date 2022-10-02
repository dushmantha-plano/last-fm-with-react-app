import 'jest-styled-components';
import Container from '../Container';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test for Container Component', () => {
  test('Should render the component', () => {
    const tree = renderer.create(<Container />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
