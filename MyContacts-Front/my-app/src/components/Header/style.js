// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

export default styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  span {
    color: #5dc7fa;
  }

  a {
    position: relative;
    color: #000;
    text-decoration: none;
  }

  a::after {
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    width: 0px;
    background-color: #000;
    bottom: -5px;
    transition: 0.3s;
  }

  a:hover::after {
    width: 100%;
  }

  .botao-sair {
    position: relative;
    color: #000;
    text-decoration: none;
    background-color: #f6f5fc;
    border: none;
    cursor: pointer;
    padding: 0px;
    font-size: 16px;
  }

  .botao-sair::after {
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    width: 0px;
    background-color: #000;
    bottom: -5px;
    transition: 0.3s;
  }

  .botao-sair:hover::after {
    width: 100%;
  }
`;
