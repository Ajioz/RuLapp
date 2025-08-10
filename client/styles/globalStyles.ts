import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Outfit", sans-serif;
}
body {
    background: #fff;
}
a{
    text-decoration: none;
    color: inherit;
    line-height: 1;
    cursor: pointer;
}
.container {
    padding-left: 30px;
    padding-right: 10px;
}
.btn{
    background: #fff;
    columns: #212121;
    padding: 14px 25px;
    font-size: 16px;
    border-radius: 30px;
    cursor: pointer;
    border: 0;
    outline: 0;
    display:inline-flex;
    align-items: center;
    justify-content: center;
    color: #013e2a;
}
.btn img {
    width: 20px;
    margin-left: 10px;
}
.btn.dark-btn {
    background: #013e2a;
    color: #fff;
}


.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;

}

/*-------- media query --------*/
@media (max-width: 1200px) {
    .container {
        padding-left: 5%;
        padding-right: 5%;
    }
}
`;
