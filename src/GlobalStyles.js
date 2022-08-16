import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px
    }
    
    &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #888;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;
