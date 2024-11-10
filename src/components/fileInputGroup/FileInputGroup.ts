import Block from "../../globalClasses/Block";
import FileInput from "./fileInput/FileInput";

import "./fileInputGroup.scss";

interface FileInputGroupProps {
  isFile?: boolean;
  labelName: string;
  labelFor: string;
  inputName: string;
  inputType: string;
  inputId: string;
  inputPlaceholder: string;
  errorText: string;
  fileName: string;
  events: {
    blur?: (event: Event) => void;
    change?: (event: Event) => void;
  };
}
export default class FileInputGroup extends Block {
  constructor(props: FileInputGroupProps) {
    super({
      ...props,
      Input: new FileInput({
        ...props,
      }),
    });
  }

  protected render(): string {
    return `
      <div class="file-input-group">
        {{{Input}}}
          <label for="avatar" class="file-input__label">{{#if fileName}} {{fileName}} {{else}} {{labelName}} {{/if}}</label>
        {{#if errorText}}
          <span class="file-input__error">{{errorText}}</span>
        {{/if}}
      </div>
    `;
  }
}
