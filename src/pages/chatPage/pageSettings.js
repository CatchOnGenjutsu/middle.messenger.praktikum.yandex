export const burgerActionButtonsSettings = [
  {
    label: "Добавить пользователя",
    icon: "/static/icons/add_user_icon.png",
  },
  {
    label: "Удалить пользователя",
    icon: "/static/icons/delete_user_icon.png",
  },
  {
    label: "Удалить чат",
    icon: "/static/icons/trashcan_icon.png",
  },
];

export const addAppsActionButtonsSettings = [
  {
    label: "Фото или Видео",
    icon: "/static/icons/add_image_icon.png",
  },
  {
    label: "Файл",
    icon: "/static/icons/add_file_icon.png",
  },
  {
    label: "Локация",
    icon: "/static/icons/add_location_icon.png",
  },
];

export const modalWindowSettings = {
  title: "Добавить пользователя",
  inputOptions: {
    labelName: "Логин",
    id: "login",
    name: "login",
    type: "text",
    placeholder: "Введите логин",
    errorText: "",
  },
  buttonOptions: {
    value: "Добавить",
    type: "submit",
    class: "submit-button",
    id: "submit-btn",
    name: "submit-btn",
  },
};
