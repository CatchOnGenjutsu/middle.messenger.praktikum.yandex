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

export default class ProfileFormBlock extends Block {
  constructor(props: ProfileFormBlockProps) {
    super({
      ...props,
      InputsGroup: props.inputOptions.map(
        (item, index) =>
          new InputGroup({
            inputOption: {
              ...item,
              events: {
                blur: (event: Event) => {
                  if (!event) return;

                  const target = event.target as HTMLInputElement;
                  const value = target.value;
                  const elem = this.lists.InputsGroup.find(
                    (item) => item.props.inputOption.inputId === target.id,
                  );

                  if (elem) {
                    const errorMessage = item.validation(value, this.lists.InputsGroup as InputGroup[]);
                    elem.children.Error.setProps({ errorText: errorMessage });
                  }
                },
              },
            },
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
    console.log(inputsGroup);
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

    console.log(oldProfileProps);
    console.log(newProfileProps);
    console.log(this.lists.InputsGroup);
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
