interface FormFieldProps {
  labelName: string;
  labelFor: string;
  inputName: string;
  inputType: string;
  inputId: string;
  inputPlaceholder: string;
  inputClassName?: string;
  events?: {
    // focus?: (event: Event) => void;
    blur: (event: Event) => void;
    // input?: (event: Event) => void;
  };
  errorText?: string | null;
  errorClassName?: string;
}

const FormFieldSettings: FormFieldProps[] = [
  {
    labelName: "Логин",
    labelFor: "login",
    inputName: "login",
    inputType: "text",
    inputId: "login",
    inputPlaceholder: "Введите логин",
    errorText: null,
  },
  {
    labelName: "Пароль",
    labelFor: "password",
    inputName: "password",
    inputType: "password",
    inputId: "password",
    inputPlaceholder: "Введите пароль",
    errorText: "",
  },
];
