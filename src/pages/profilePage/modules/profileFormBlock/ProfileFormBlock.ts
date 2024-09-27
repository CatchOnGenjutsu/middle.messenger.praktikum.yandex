import Block from "../../../../globalClasses/Block";
import Button from "../../../../components/button/Button";
import InputGroup from "../inputGroup/InputGroup";

import "./profileFormBlock.scss";

interface ProfileFormBlockProps {
  isEditData: boolean;
  inputOptions: Record<string, Record<string, string | boolean | null>>;
  buttonOptions: Record<string, string>;
}

export default class ProfileFormBlock extends Block {
  constructor(props: ProfileFormBlockProps) {
    console.log(props);
    super({
      ...props,
      InputsGroup: [
        ...Object.entries(props.inputOptions).map(
          ([key, value]) =>
            new InputGroup({
              inputOption: { ...value },
              isEditData: props.isEditData,
              isLast: key === Object.keys(props.inputOptions)[Object.keys(props.inputOptions).length - 1],
            }),
        ),
      ],
      Button: new Button({ ...props.buttonOptions }),
    });
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
