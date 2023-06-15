// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 40px;
  gap: 10px;

  a {
    font-size: 14px;
    text-decoration: none;
    margin-left: 60px;
    margin-top: 10px;
  }

  a:hover {
    color: #397a99;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #5dc7fa;
  color: #000;
  font-size: 1.25rem;
  position: relative;
`;

export const ButtonSubmit = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #5dc7fa;
  background-color: #b8e2ff;
  cursor: pointer;

  :hover {
    background-color: #8aa9bf;
  }
`;

export const ButtonPassword = styled.button`
  background-color: #f6f5fc;
  border: none;
  cursor: pointer;
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;

  img {
    width: 24px;
    height: 24px;
  }
`;
