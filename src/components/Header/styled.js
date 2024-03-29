import styled, { css } from 'styled-components';

export const Container = styled.header`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: ${theme.spacings.small};
    overflow: hidden;

    @media only screen and (max-width: 700px) {
      text-align: center;
    }

    button {
      cursor: pointer;
      display: none;
      float: left;
      border: none;
      background: ${theme.colors.primary};

      &:active {
        svg {
          opacity: 0.6;
        }
      }

      @media only screen and (max-width: 700px) {
        display: block;
      }
    }

    ul#menuHamburguer {
      margin-left: -${theme.spacings.small};
      list-style: none;
      display: none;
      float: left;
      position: absolute;
      margin-top: 43px;
      background-color: rgba(0, 0, 0, 0.9);
      min-width: 320px;
      z-index: 1;

      @media only screen and (max-width: 700px) {
        width: 100%;
      }

      li {
        text-align: center;
        padding: 15px;
        border-top: 1px solid ${theme.colors.gold};
      }
    }

    a {
      color: ${theme.colors.white};
      padding: 5px;
      font-size: ${theme.font.sizes.medium};

      &:hover {
        color: ${theme.colors.gold};
        opacity: 1;
      }
    }

    a.homeLogo {
      color: ${theme.colors.gold};
      font-size: ${theme.font.sizes.large};
      padding: 0;
      margin-left: ${theme.spacings.small};
      letter-spacing: 0.7px;

      &:hover {
        opacity: 0.6;
      }

      @media only screen and (max-width: 700px) {
        margin-left: 0;
      }
    }

    ul.deskMenu {
      list-style: none;
      float: right;
      margin-right: ${theme.spacings.small};
      margin-top: 3px;

      @media only screen and (max-width: 700px) {
        display: none;
      }

      li {
        display: inline-block;
        vertical-align: middle;
      }
    }
  `}
`;

export const Button = styled.button`
  ${({ theme }) => css`
    cursor: pointer;
    padding: 3px 3px 0 3px;
    color: ${theme.colors.white};
    background-color: ${theme.colors.black};
    border: none;
    font-size: 100%;
    vertical-align: middle;

    &:hover {
      color: ${theme.colors.gold};
      opacity: 1;
    }
  `}
`;
