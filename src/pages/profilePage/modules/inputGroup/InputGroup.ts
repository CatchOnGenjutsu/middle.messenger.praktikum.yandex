import Block, { BlockProps } from "../../../../globalClasses/Block";
import DisplayValue from "../../partials/displayValue/DisplayValue";
import ProfileInput from "../../partials/profileInput/ProfileInput";
import ProfileLabel from "../../partials/profileLabel/ProfileLabel";
import { Error } from "../../../../components/error/Error";

import { FormFieldConfig } from "../../profilePageSettings";

import "./inputGroup.scss";

export interface InputGroupProps extends BlockProps {
  isEditData: boolean;
  inputOption: FormFieldConfig & {
    events?: Record<string, (event: Event) => void>;
  };
  isLast: boolean;
}

export default class InputGroup extends Block {
  constructor(props: InputGroupProps) {
    super({
      ...props,
      ProfileLabel: new ProfileLabel({
        ...props,
      }),
      ProfileInput: new ProfileInput({
        ...props,
      }),
      DisplayValue: new DisplayValue({
        ...props,
      }),
      Error: new Error({}),
    });
  }

  render(): string {
    return `
    <div class="input-group">
      <div class="input-group__input-row">
        {{{ ProfileLabel }}}
        {{#if isEditData}}
          {{{ ProfileInput }}}
        {{else}}
          {{{ DisplayValue }}}
        {{/if}}
      </div>
      <hr class="input-group__input-row__hr {{#if isLast}}input-group__input-row__hr_last{{/if}}">
      {{{ Error }}}
    </div>
    `;
  }
}
