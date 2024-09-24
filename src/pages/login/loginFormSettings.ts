interface FormFieldProps {
  labelName: string;
  for: string;
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
  errorText?: string;
  errorClassName?: string;
}

const FormFieldSettings: FormFieldProps[] = [
  {
    labelName: "Логин",
    for: "login",
    inputName: "login",
    inputType: "text",
    inputId: "login",
    inputPlaceholder: "Введите логин",
    errorText: "",
  },
  {
    labelName: "Пароль",
    for: "password",
    inputName: "password",
    inputType: "password",
    inputId: "password",
    inputPlaceholder: "Введите пароль",
    errorText: "",
  },
];
