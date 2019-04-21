import { createGlobalStyle } from "styled-components";
import theme from "./theme";

createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    font-style: normal;
  }
  body {
    margin: 0;
    padding: 0;
    font: 400 ${theme.fonts.size} / 1.4 ${theme.fonts.family};
  }
`;
