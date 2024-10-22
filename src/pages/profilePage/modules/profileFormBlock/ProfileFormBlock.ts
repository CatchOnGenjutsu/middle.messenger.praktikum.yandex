import Block, { BlockProps } from "../../../../globalClasses/Block";
import Button, { ButtonProps } from "../../../../components/button/Button";
import InputGroup from "../inputGroup/InputGroup";

import { FormFieldConfig } from "../../profilePageSettings";

import "./profileFormBlock.scss";

export interface ProfileFormBlockProps {
  isEditData: boolean;
  inputOptions: FormFieldConfig[];
  buttonOptions: ButtonProps;
}

// export default class ProfileFormBlock extends Block {
//   constructor(props: ProfileFormBlockProps) {
//     console.log(props);
//     super({
//       ...props,
//       InputsGroup: [
//         ...props.inputOptions.map(
//           (item) =>
//             new InputGroup({
//               inputOption: {
//                 ...item,
//                 events: ((item: FormFieldConfig): Record<string, (event: Event) => void> => {
//                   switch (item.inputId) {
//                     case "email":
//                       return {
//                         blur: (event: Event) => {
//                           if (!event) return;

//                           const target = event.target as HTMLInputElement;
//                           const inputValue = target.value;
//                           const group = this.lists.InputsGroup.find(
//                             (item) =>
//                               (item.props.inputOption as Record<string, string>).inputId === target.id,
//                           );
//                           if (group) {
//                             if (inputValue && !/^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(inputValue)) {
//                               group.children.Error.setProps({
//                                 errorText: "Неправильно введена почта. Почта должна содержать символы @ и .",
//                               });
//                             } else {
//                               group.children.Error.setProps({
//                                 errorText: "",
//                               });
//                             }
//                           }
//                         },
//                       };
//                     case "login":
//                       return {
//                         blur: (event: Event) => {
//                           if (!event) return;

//                           const target = event.target as HTMLInputElement;
//                           const inputValue = target.value;
//                           const group = this.lists.InputsGroup.find(
//                             (item) =>
//                               (item.props.inputOption as Record<string, string>).inputId === target.id,
//                           );
//                           if (group) {
//                             if (inputValue && !/^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/.test(inputValue)) {
//                               group.children.Error.setProps({
//                                 errorText:
//                                   "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов.",
//                               });
//                             } else {
//                               group.children.Error.setProps({
//                                 errorText: "",
//                               });
//                             }
//                           }
//                         },
//                       };
//                     case "first_name":
//                     case "second_name":
//                       return {
//                         blur: (event: Event) => {
//                           if (!event) return;

//                           const target = event.target as HTMLInputElement;
//                           const inputValue = target.value;
//                           const group = this.lists.InputsGroup.find(
//                             (item) =>
//                               (item.props.inputOption as Record<string, string>).inputId === target.id,
//                           );
//                           if (group) {
//                             if (inputValue && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(inputValue)) {
//                               group.children.Error.setProps({
//                                 errorText:
//                                   "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).",
//                               });
//                             } else {
//                               group.children.Error.setProps({
//                                 errorText: "",
//                               });
//                             }
//                           }
//                         },
//                       };
//                     case "phone":
//                       return {
//                         blur: (event: Event) => {
//                           if (!event) return;

//                           const target = event.target as HTMLInputElement;
//                           const inputValue = target.value;
//                           const group = this.lists.InputsGroup.find(
//                             (item) =>
//                               (item.props.inputOption as Record<string, string>).inputId === target.id,
//                           );
//                           if (group) {
//                             if (inputValue && !/^\+?\d{10,15}$/u.test(inputValue)) {
//                               group.children.Error.setProps({
//                                 errorText: "Должен содержать от 10 до 15 цифр, может начинается с плюса.",
//                               });
//                             } else {
//                               group.children.Error.setProps({
//                                 errorText: "",
//                               });
//                             }
//                           }
//                         },
//                       };
//                     case "oldPassword":
//                     case "newPassword":
//                       return {
//                         blur: (event: Event) => {
//                           if (!event) return;

//                           const target = event.target as HTMLInputElement;
//                           const inputValue = target.value;
//                           const group = this.lists.InputsGroup.find(
//                             (item) =>
//                               (item.props.inputOption as Record<string, string>).inputId === target.id,
//                           );
//                           if (group) {
//                             if (inputValue && !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(inputValue)) {
//                               group.children.Error.setProps({
//                                 errorText:
//                                   "Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
//                               });
//                             } else {
//                               group.children.Error.setProps({
//                                 errorText: "",
//                               });
//                             }
//                           }
//                         },
//                       };
//                     case "newPasswordRepeat":
//                       return {
//                         blur: (event: Event) => {
//                           if (!event) return;

//                           const target = event.target as HTMLInputElement;
//                           const inputValue = target.value;
//                           const group = this.lists.InputsGroup.find(
//                             (item) =>
//                               (item.props.inputOption as Record<string, string>).inputId === target.id,
//                           );
//                           if (group) {
//                             if (inputValue && !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(inputValue)) {
//                               group.children.Error.setProps({
//                                 errorText: "Пароли должны совпадать.",
//                               });
//                             } else {
//                               group.children.Error.setProps({
//                                 errorText: "",
//                               });
//                             }
//                           }
//                         },
//                       };
//                     default:
//                       return {};
//                   }
//                 })(item),
//               },
//               isEditData: props.isEditData,
//               isLast: props.inputOptions.indexOf(item) === props.inputOptions.length - 1,
//             }),
//         ),
//       ],
//       Button: new Button({ ...props.buttonOptions }),
//     });
//   }
export default class ProfileFormBlock extends Block {
  constructor(props: ProfileFormBlockProps) {
    super({
      ...props,
      InputsGroup: props.inputOptions.map(
        (item, index) =>
          new InputGroup({
            inputOption: { ...item },
            isEditData: props.isEditData,
            isLast: index === props.inputOptions.length - 1,
          }),
      ),
      Button: new Button({ ...props.buttonOptions }),
    });
  }

  private _updateInputGroups(newProps: ProfileFormBlockProps) {
    const { inputOptions, isEditData } = newProps;

    // Используем this.lists для доступа к InputsGroup
    const inputsGroup = this.lists.InputsGroup;

    if (Array.isArray(inputsGroup)) {
      inputsGroup.forEach((inputGroup: Block, index: number) => {
        const newInputOption = inputOptions[index];
        inputGroup.setProps({
          inputOption: { ...newInputOption },
          isEditData,
          isLast: index === inputOptions.length - 1,
        });
      });
    }
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const oldProfileProps = oldProps as unknown as ProfileFormBlockProps;
    const newProfileProps = newProps as unknown as ProfileFormBlockProps;

    if (
      oldProfileProps.inputOptions !== newProfileProps.inputOptions ||
      oldProfileProps.isEditData !== newProfileProps.isEditData
    ) {
      this._updateInputGroups(newProfileProps);
    }
  }

  render() {
    return `
      <form class="profile-form-block__form">
        {{{ InputsGroup }}}
        <div class="profile-form-block__form__buttons">
          {{#if isEditData}}{{{ Button }}}{{/if}}
        </div>
      </form>
    `;
  }
}
