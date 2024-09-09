import Handlebars from "handlebars/runtime";

import Login from "./pages/login/login";
import Input from "./components/input/input";

import "./index.scss";

Handlebars.registerPartial("Input", Input);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const LoginPage = Login();

  root.innerHTML = LoginPage;
});
