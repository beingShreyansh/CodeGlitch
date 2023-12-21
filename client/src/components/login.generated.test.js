import renderer from 'react-test-renderer';
import React, { useState } from 'react';

import logo from '.././logo192.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './login';

jest.mock('./styles/login.css');
jest.mock('.././logo192.png');
jest.mock('axios');
jest.mock('react-router-dom');

const renderTree = tree => renderer.create(tree);
describe('<Login>', () => {
  it('should render component', () => {
    expect(renderTree(<Login 
    />).toJSON()).toMatchSnapshot();
  });
  
});