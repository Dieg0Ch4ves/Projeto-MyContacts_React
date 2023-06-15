// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.section`
  margin-right: 400px;

  input {
    margin-top: 48px;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0px 16px;
  }

  .ordenacao {
    font-size: 1.5rem;
    color: #5dc7fa;
    position: relative;
    background-color: #f6f5fc;
    border: none;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      transform: translate(-50%, -50%) rotate(90deg);
      position: absolute;
      left: auto;
      margin-left: 10px;
      margin-top: 15px;
    }

    .ordenacao:hover img {
      transition: 0.3s;
      transform: translate(-50%, -50%) rotate(270deg);
    }
  }

  .header-banner {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
    gap: 60px;

    a {
      text-decoration: none;
      color: #49a6d3;
      border: 1px solid #49a6d3;
      padding: 10px;
      border-radius: 10px;
    }

    a:hover {
      background-color: #1e4c62;
      color: #fff;
    }
  }


  @media (max-width: 1200px) {
    margin-right:200px;
  }

  @media (max-width: 800px) {
    margin-right:100px;
  }

  @media (max-width: 580px) {
    margin-right: 0px;
  }
`;

export const Card = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  justify-content: center;

  .div1-banner {
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    gap: 10px;
    align-items: center;

    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1rem;
      color: #007375;
      background-color: #ccfaff;
      padding: 4px;
      border-radius: 4px;
    }
  }

  .div2-banner {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .edit {
      padding: 2px;
      background-color: #eefefe;
      border-radius: 4px;
      border: 1px inset #000;
    }

    .trash {
      background-color: #fdb0b0;
      border-radius: 4px;
      border: 1px inset #000;
      cursor: pointer;

      img {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
