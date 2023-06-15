// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .link {
    display: flex;
    text-decoration: none;
    align-items: center;
    margin-top: 20px;
    gap: 5px;
    img {
      width: 24px;
      height: 24px;
      rotate: 180deg;
    }

    span {
      color: #5dc7fa;
    }
  }
`;

export const Select = styled.select`
  padding: 10px;
  width: 263px;
  border-radius: 4px;
  border: 1px solid #5dc7fa;
  font-size: 1.25rem;
  cursor: pointer;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #5dc7fa;
  color: #ccc;
  font-size: 1.25rem;
`;
