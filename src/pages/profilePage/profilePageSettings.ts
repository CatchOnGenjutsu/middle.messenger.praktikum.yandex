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
  value?: string;
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

export interface ProfilePageSettings {
  isEditData: boolean;
  inputOptions: FormFieldConfig[];
}

export const profilePageMainDataSettings: ProfilePageSettings = {
  isEditData: false,
  inputOptions: [
    {
      labelName: "Почта",
      labelFor: "email",
      inputName: "email",
      inputType: "text",
      inputId: "email",
      inputPlaceholder: "Введите почту",
      validation: (value: string) =>
        value && !/^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(value)
          ? "Неправильно введена почта. Почта должна содержать символы @ и ."
          : null,
    },
    {
      labelName: "Логин",
      labelFor: "login",
      inputName: "login",
      inputType: "text",
      inputId: "login",
      inputPlaceholder: "Введите логин",
      validation: (value: string) =>
        value && !/^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/.test(value)
          ? "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)."
          : null,
    },
    {
      labelName: "Имя",
      labelFor: "first_name",
      inputName: "first_name",
      inputType: "text",
      inputId: "first_name",
      inputPlaceholder: "Введите имя",
      validation: (value: string) =>
        value && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(value)
          ? "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)."
          : null,
    },
    {
      labelName: "Фамилия",
      labelFor: "second_name",
      inputName: "second_name",
      inputType: "text",
      inputId: "second_name",
      inputPlaceholder: "Введите фамилию",
      validation: (value: string) =>
        value && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(value)
          ? "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)."
          : null,
    },
    {
      labelName: "Телефон",
      labelFor: "phone",
      inputName: "phone",
      inputType: "tel",
      inputId: "phone",
      inputPlaceholder: "Введите телефон",
      validation: (value: string) =>
        value && !/^\+?\d{10,15}$/u.test(value)
          ? "Должен содержать от 10 до 15 цифр, может начинаться с плюса."
          : null,
    },
  ],
};

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
  value: "Сохранить",
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
