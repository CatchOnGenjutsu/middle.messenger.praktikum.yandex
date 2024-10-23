import { ButtonProps } from "../../components/button/Button";
import FormField from "../../components/formField/FormField";
import { LinkProps } from "../../components/link/Link";
import { ModalWindowProps } from "../../components/modalWindow/ModalWindow";
import { OverlayProps } from "../../components/overlay/Overlay";
import Block from "../../globalClasses/Block";
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
  inputOptions: FormFieldConfig[];
}

export const profilePageMainDataSettings: ProfilePageSettings = {
  inputOptions: [
    {
      labelName: "Почта",
      labelFor: "email",
      inputName: "email",
      inputType: "text",
      inputId: "email",
      inputPlaceholder: "Введите почту",
      value: "",
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
      value: "",
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
      value: "",
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
      value: "",
      validation: (value: string) =>
        value && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(value)
          ? "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)."
          : null,
    },
    {
      labelName: "Имя в чате",
      labelFor: "display_name",
      inputName: "display_name",
      inputType: "text",
      inputId: "display_name",
      inputPlaceholder: "Введите имя в чате",
      value: "",
      validation: (value: string) => (!value ? "Введите имя в чате" : null),
    },
    {
      labelName: "Телефон",
      labelFor: "phone",
      inputName: "phone",
      inputType: "tel",
      inputId: "phone",
      inputPlaceholder: "Введите телефон",
      value: "",
      validation: (value: string) =>
        value && !/^\+?\d{10,15}$/u.test(value)
          ? "Должен содержать от 10 до 15 цифр, может начинаться с плюса."
          : null,
    },
  ],
};

export const profilePagePasswordSettings: ProfilePageSettings = {
  inputOptions: [
    {
      labelName: "Старый пароль",
      labelFor: "oldPassword",
      inputId: "oldPassword",
      inputName: "oldPassword",
      inputType: "password",
      inputPlaceholder: "Старый пароль",
      validation: (value: string) =>
        value && !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value)
          ? "Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
          : null,
    },
    {
      labelName: "Новый пароль",
      labelFor: "newPassword",
      inputId: "newPassword",
      inputName: "newPassword",
      inputType: "password",
      inputPlaceholder: "Новый пароль",
      validation: (value: string) =>
        value && !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value)
          ? "Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
          : null,
    },
    {
      labelName: "Повторите новый пароль",
      labelFor: "repeatNewPassword",
      inputId: "repeatNewPassword",
      inputName: "repeatNewPassword",
      inputType: "password",
      inputPlaceholder: "Повторите новый пароль",
      validation: (value: string, allFields?: FormField[]) => {
        const passwordField = allFields?.find(
          (field: FormField) => (field.props as FormFieldProps).inputId === "newPassword",
        );
        const passwordValue = passwordField?.getContent()?.querySelector("input")?.value;

        return value && value !== passwordValue ? "Пароли должны совпадать." : null;
      },
    },
  ],
};

export const modalWindowAddAvatarSettings: OverlayProps = {
  title: "Загрузите файл",
  inputOptions: {
    labelName: "Выбрать файл на компьютере",
    labelFor: "avatar",
    inputId: "avatar",
    inputName: "avatar",
    inputType: "file",
    inputPlaceholder: "Выберите аватар",
    errorText: "",
    fileName: "",
    isFile: true,
    events: {},
  },
  buttonOptions: {
    value: "Поменять",
    type: "submit",
    class: "submit-button",
    id: "change-btn",
    name: "submit-btn",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
    },
  },
  overlayEvents: {
    click: (event: Event) => {
      event.stopPropagation();
    },
  },
};

export const profileActionsButtonsSettings = {
  editData: {
    text: "Изменить данные",
    key: "editData",
    modifierClass: "button--primary",
  },
  editPassword: {
    text: "Изменить пароль",
    key: "editPassword",
    modifierClass: "button--primary",
  },
  exit: {
    text: "Выйти",
    key: "exit",
    modifierClass: "button--danger",
  },
};

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
