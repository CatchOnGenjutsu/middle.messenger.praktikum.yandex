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
    events: {
      blur: (event: Event) => {
        if (!event) return;

        const target = event.target as HTMLInputElement;
        const value = target.value;
        // const elem = this..find((item) => item.props.inputId === target.id);
        // if () {
        if (value && !/^(?=[a-zA-Z-_]*[a-zA-Z][a-zA-Z0-9-_]{2,19})$/.test(value)) {
          this.setProps({
            errorText:
              "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
          });
        } else {
          this.setProps({
            errorText: null,
          });
        }
        // }
      },
    },
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
