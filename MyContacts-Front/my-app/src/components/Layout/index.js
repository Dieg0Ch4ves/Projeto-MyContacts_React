import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../Routes';
import GlobalStyled from '../../assets/styles/global';
import Header from '../Header';

export default function Layout() {
  return (
    <>
      <GlobalStyled />
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </>
  );
}
