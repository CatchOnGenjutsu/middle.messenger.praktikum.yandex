import Block from "../../globalClasses/Block";
import { FormField } from "../../components/formField/FormField";
import Button from "../../components/button/Button";
import store from "../../globalClasses/Store";
// import store from "../../store"; // Импорт Store

import { FormFieldConfig } from "../../globalClasses/interfaces"; // Тип настроек поля
import "./registration.scss";

export default class Registration extends Block {
  constructor(props: any) {
    const { RegistrationPageSettings } = store.getState(); // Получаем данные из Store
    console.log(RegistrationPageSettings);
    console.log(props);
    super({
      Fields: RegistrationPageSettings.map(
        (config: FormFieldConfig) =>
          new FormField({
            ...config,
            events: {
              blur: (event: Event) => this.validateField(event), // Используем общий метод валидации
            },
          }),
      ),
      Button: new Button({
        class: "submit-button",
        value: "Зарегистрироваться",
        type: "submit",
        id: "submit-btn",
        name: "submit-btn",
      }),
      events: {
        submit: (event: Event) => this.handleSubmit(event),
      },
    });

    // Подписываемся на обновления Store
    store.subscribe(() => this.updateFields());
  }

  /**
   * Метод валидации одного поля, вызывается при blur и сабмите.
   */
  private validateField(event: Event): boolean {
    // debugger;
    const target = event.target as HTMLInputElement;
    if (!target) return false;

    const value = target.value;
    const inputId = target.id;

    // Находим конфигурацию поля из Store
    const { RegistrationPageSettings } = store.getState();
    const config = RegistrationPageSettings.find((f) => f.inputId === inputId);

    if (config) {
      // Выполняем валидацию и сохраняем ошибку в Store
      const errorMessage = config.validation(value);
      store.dispatch({
        type: "UPDATE_FORM_FIELD_ERROR",
        fieldId: inputId,
        errorText: errorMessage,
      });
      if (!errorMessage) {
        return true;
      }

      // return !errorMessage; // Возвращаем true, если нет ошибки
    }
    return false;
  }

  /**
   * Метод обновления полей при изменениях в Store.
   */
  private updateFields() {
    // debugger;
    const { RegistrationPageSettings } = store.getState();
    const updatedFields = RegistrationPageSettings.map(
      (config: FormFieldConfig) =>
        new FormField({
          ...config,
          events: {
            blur: (event: Event) => this.validateField(event), // Обновляем событие blur
          },
        }),
    );
    // console.log(updatedFields[0].props.errorText);
    this.setProps({ Fields: updatedFields });
  }

  /**
   * Метод сабмита формы с валидацией всех полей.
   */
  private handleSubmit(event: Event) {
    event.preventDefault();

    let isFormValid = true;

    // Валидация всех полей формы
    this.lists.Fields.forEach((field: Block) => {
      const inputElement = field.getContent().querySelector("input") as HTMLInputElement;
      if (inputElement) {
        const customEvent = new Event("validate", { bubbles: true, cancelable: true });
        Object.defineProperty(customEvent, "target", { value: inputElement, writable: false });

        const isValid = this.validateField(customEvent); // Используем кастомное событие
        if (!isValid) isFormValid = false;
      }
    });

    if (isFormValid) {
      const formData = new FormData(event.target as HTMLFormElement);
      const data: Record<string, string> = {};

      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      console.log(data); // Отправляем данные или выполняем другие действия
    }
  }

  protected render(): string {
    return `
      <main class="registration-container">
        <div class="registration-container__registration-block">
          <h1>Регистрация</h1>
          <form class="registration-container__form" action="submit">
              {{{Fields}}}
              {{{Button}}}
          </form>
          <a class="registration-container__link" href="/">Войти</a>
        </div>
      </main>
    `;
  }
}
