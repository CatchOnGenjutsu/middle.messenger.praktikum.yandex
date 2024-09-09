import Handlebars from "handlebars";
import LoginTemplate from "./login.hbs?raw";
import "./login.scss";

// import Input from "../../components/input/input.hbs";

const Login = Handlebars.compile(LoginTemplate);
export default Login;
