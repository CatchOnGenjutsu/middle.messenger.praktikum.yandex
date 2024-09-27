export const profilePageViewModeMainDataSettings = {
  isEditData: false,
  avatarUrl: "",
  inputOptions: {
    email: {
      labelName: "Почта",
      labelFor: "email",
      inputName: "email",
      inputType: "email",
      inputId: "email",
      inputPlaceholder: "Введите почту",
      errorText: null,
      // events: {
      //   blur: (event: Event) => {
      //     if (!event) return;

      //     const target = event.target as HTMLInputElement;
      //     const value = target.value;
      //     const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
      //     if (elem) {
      //       if (value && !/^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(value)) {
      //         elem.setProps({
      //           errorText: "Неправильно введена почта. Почта должна содержать символы @ и .",
      //         });
      //       } else {
      //         elem.setProps({
      //           errorText: null,
      //         });
      //       }
      //     }
      //   },
      // },
      value: "E7R5v@example.com",
    },
    login: {
      labelName: "Логин",
      labelFor: "login",
      inputName: "login",
      inputType: "text",
      inputId: "login",
      inputPlaceholder: "Введите логин",
      errorText: null,
      // events: {
      //   blur: (event: Event) => {
      //     if (!event) return;

      //     const target = event.target as HTMLInputElement;
      //     const value = target.value;
      //     const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
      //     if (elem) {
      //       if (value && !/^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/.test(value)) {
      //         elem.setProps({
      //           errorText:
      //             "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).",
      //         });
      //       } else {
      //         elem.setProps({
      //           errorText: null,
      //         });
      //       }
      //     }
      //   },
      // },
      value: "login123",
    },
    first_name: {
      labelName: "Имя",
      labelFor: "first_name",
      inputName: "first_name",
      inputType: "text",
      inputId: "first_name",
      inputPlaceholder: "Введите имя",
      errorText: null,
      // events: {
      //   blur: (event: Event) => {
      //     if (!event) return;

      //     const target = event.target as HTMLInputElement;
      //     const value = target.value;
      //     const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
      //     if (elem) {
      //       if (value && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(value)) {
      //         elem.setProps({
      //           errorText:
      //             "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
      //         });
      //       } else {
      //         elem.setProps({
      //           errorText: null,
      //         });
      //       }
      //     }
      //   },
      // },
      value: "Иван",
    },
    second_name: {
      labelName: "Фамилия",
      labelFor: "second_name",
      inputName: "second_name",
      inputType: "text",
      inputId: "second_name",
      inputPlaceholder: "Введите фамилию",
      errorText: null,
      // events: {
      //   blur: (event: Event) => {
      //     if (!event) return;

      //     const target = event.target as HTMLInputElement;
      //     const value = target.value;
      //     const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
      //     if (elem) {
      //       if (value && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(value)) {
      //         elem.setProps({
      //           errorText:
      //             "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
      //         });
      //       } else {
      //         elem.setProps({
      //           errorText: null,
      //         });
      //       }
      //     }
      //   },
      // },
      value: "Иванов",
    },
    display_name: {
      labelName: "Имя в чате",
      labelFor: "display_name",
      inputName: "display_name",
      inputType: "text",
      inputId: "display_name",
      inputPlaceholder: "Введите имя в чате",
      value: "Иван",
    },
    phone: {
      labelName: "Телефон",
      labelFor: "phone",
      inputName: "phone",
      inputType: "tel",
      inputId: "phone",
      inputPlaceholder: "Введите телефон",
      errorText: null,
      // events: {
      //   blur: (event: Event) => {
      //     if (!event) return;

      //     const target = event.target as HTMLInputElement;
      //     const value = target.value;
      //     const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
      //     if (elem) {
      //       if (value && !/^\+?\d{10,15}$/u.test(value)) {
      //         elem.setProps({
      //           errorText: "Должен содержать от 10 до 15 цифр, может начинается с плюса",
      //         });
      //       } else {
      //         elem.setProps({
      //           errorText: null,
      //         });
      //       }
      //     }
      //   },
      // },
      value: "+7 999 999 99 99",
    },
  },
};

export const profilePageEditPasswordDataSettings = {
  isEditData: true,
  avatarUrl: "",
  inputOptions: {
    oldPassword: {
      labelName: "Старый пароль",
      labelFor: "oldPassword",
      inputId: "oldPassword",
      inputName: "oldPassword",
      inputType: "password",
      inputPlaceholder: "Старый пароль",
      value: "12345678",
    },
    newPassword: {
      labelName: "Новый пароль",
      labelFor: "newPassword",
      inputId: "newPassword",
      inputName: "newPassword",
      inputType: "password",
      inputPlaceholder: "Новый пароль",
      value: "12345678",
    },
    newPasswordRepeat: {
      labelName: "Повторите новый пароль",
      labelFor: "newPasswordRepeat",
      inputId: "newPasswordRepeat",
      inputName: "newPasswordRepeat",
      inputType: "password",
      inputPlaceholder: "Повторите новый пароль",
      value: "12345678",
    },
  },
};

export const saveButtonOptions = {
  value: "Сохранить",
  type: "submit",
  class: "submit-button",
  id: "submit-btn",
  name: "submit-btn",
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

export const modalWindowAddAvatarSettings = {
  title: "Загрузите файл",
  inputOptions: {
    labelName: "Выбрать файл на компьютере",
    labelFor: "avatar",
    inputId: "avatar",
    inputName: "avatar",
    inputType: "file",
    inputPlaceholder: "Выберите аватар",
    errorText: "",
    isFile: true,
  },
  buttonOptions: {
    value: "Поменять",
    type: "submit",
    class: "submit-button",
    id: "change-btn",
    name: "submit-btn",
  },
};
