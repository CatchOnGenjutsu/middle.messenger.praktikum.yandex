import { ButtonProps } from "../../components/button/Button";
import FormField from "../../components/formField/FormField";
import { LinkProps } from "../../components/link/Link";
import Router from "../../globalClasses/Router";
export interface FormFieldConfig {
  labelName: string;
  labelFor: string;
  inputName: string;
  inputType: "text" | "email" | "password" | "tel";
  inputId: string;
  inputPlaceholder: string;
  validation: (value: string, allFields?: FormField[]) => string | null;
}

interface FormFieldProps extends FormFieldConfig {
  errorText: string | null;
  events: {
    blur: (event: Event) => void;
  };
}

export interface FormFieldInstance {
  props: FormFieldProps;
  children: {
    error: {
      setProps: (props: { errorText: string | null }) => void;
    };
  };
  getContent: () => HTMLElement;
}
export const formFieldsConfig: FormFieldConfig[] = [
  {
    labelName: "Логин",
    labelFor: "login",
    inputName: "login",
    inputType: "text",
    inputId: "login",
    inputPlaceholder: "Введите логин",
    validation: (value: string) => (!value ? "Введите логин" : null),
  },
  {
    labelName: "Пароль",
    labelFor: "password",
    inputName: "password",
    inputType: "password",
    inputId: "password",
    inputPlaceholder: "Введите пароль",
    validation: (value: string) => (!value ? "Введите пароль" : null),
  },
];

export const buttonSettings: ButtonProps = {
  class: "submit-button",
  value: "Войти",
  type: "submit",
  id: "submit-btn",
  name: "submit-btn",
};

export const linkSettings: LinkProps = {
  href: "/sign-up",
  text: "Нет аккаунта?",
  datapage: "sign-up",
  class: "login-container__link",
  onClick: (event: Event) => {
    const router = Router.getInstance("app");
    router.go("/sign-up");
    event.preventDefault();
    event.stopPropagation();
  },
};
