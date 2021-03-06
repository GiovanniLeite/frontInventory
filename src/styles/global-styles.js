import styled, { createGlobalStyle, css } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: ${({ theme }) => theme.font.sizes.medium};

    .Toastify .Toastify__toast-container .Toastify__toast--success,
    .Toastify .Toastify__toast-container .Toastify__toast--warning,
    .Toastify .Toastify__toast-container .Toastify__toast--error {
      background: ${({ theme }) => theme.colors.black};
      border-radius: 0;
    }

    .Toastify .Toastify__toast-container .Toastify__toast--success {
      color:#00ff00;
    }

    .Toastify .Toastify__toast-container .Toastify__toast--warning {
      color: #daa520;
    }

    .Toastify .Toastify__toast-container .Toastify__toast--error {
      color: #ff0000;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    transition: opacity 300ms ease-in-out;

    &:hover {
      opacity: .6;
    }
  }
`;

export const Container = styled.section`
  max-width: 480px;
  margin: 30px auto;
  padding: 30px;
  box-shadow: 0 0 10px #666;

  @media only screen and (max-width: 480px) {
    margin-left: 5px;
    margin-right: 5px;
  }

  h1 {
    text-align: center;
  }
`;

export const CategorySelect = styled.section`
  ${({ theme }) => css`
    ul {
      padding: 0px;
      list-style: none;

      span {
        vertical-align: middle;
      }

      li {
        background-color: white;
        text-align: center;
        height: 30px;
        width: 150px;
        position: relative;
        margin-left: 5px;
        padding: 5px;

      }

      ul {
        display: none;
        list-style: none;
      }

      ul li {
        margin-left: -5px;
        opacity: 0.8;
        border-bottom: 1px solid #000;
      }

      ul li:hover {
        opacity: 1;
        background-color: #000;
      }

      ul li:hover > a {
        color:${theme.colors.gold};
      }

      li:hover > ul {
        display: block;
      }

      ul ul {
        margin-left: 149px;
        top: 0px;
        position: absolute;
        list-style: none;
      }

      a {
        text-decoration: none;
        cursor: pointer;
        color: #000;
      }

      a:hover {
        opacity: 1;
      }
     }
    }

    @media only screen and (max-width: 700px) {
      display: none;
    }
  `}
`;

export const DialogZ = styled(Dialog)`
  ${({ theme }) => css`
    .MuiPaper-root {
      border-radius: 0;
    }

    h3 {
      margin: 15px;
      margin-bottom: 5px;
      text-align: center;
    }

    span {
      border-bottom: 1px solid #333;
      width: 150px;
      margin: 0 auto;
    }

    h5 {
      text-align: center;
      padding: 10px 15px;
    }

    .MuiDialogActions-root {
      align-items: center;
    }

    button {
      text-decoration: none;
      cursor: pointer;
      padding: 5px 5px 5px 5px;
      color: ${theme.colors.gold};
      background-color: ${theme.colors.black};
      border: none;
      box-shadow: 0 0 10px #666;

      &:hover {
        opacity: 0.9;
      }
    }
  `}
`;
