import Handlebars from "handlebars";
import { Login } from "./pages/login/login";
import { Registration } from "./pages/registration/registration";
import * as components from "./components/components";

import {
  loginPageSettings,
  loginButtonOptions,
  registrationPageSettings,
  registrationButtonOptions,
} from "./constants";

for (let component in components) {
  Handlebars.registerPartial(component, components[component]);
}

function renderLogin() {
  const app = document.querySelector("#app");
  const login = Handlebars.compile(Login);
  app.innerHTML = login({
    inputsSettings: loginPageSettings,
    buttonOptions: loginButtonOptions,
  });
}

function renderRegistration() {
  const app = document.querySelector("#app");
  const registration = Handlebars.compile(Registration);
  app.innerHTML = registration({
    inputsSettings: registrationPageSettings,
    buttonOptions: registrationButtonOptions,
  });
}
function handleRoute() {
  const hash = window.location.hash;

  switch (hash) {
    case "#login":
      renderLogin();
      break;
    case "#registration":
      renderRegistration();
      break;
    default:
      break;
  }
}

window.addEventListener("hashchange", handleRoute);
