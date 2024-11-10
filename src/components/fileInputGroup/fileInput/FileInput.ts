import Block from "../../../globalClasses/Block";

import "./fileInput.scss";

interface FileInputProps {
  isFile?: boolean;
  labelName: string;
  labelFor: string;
  inputName: string;
  inputType: string;
  inputId: string;
  inputPlaceholder: string;
  errorText: string;
  events: {
    blur?: (event: Event) => void;
    change?: (event: Event) => void;
  };
}
export default class FileInput extends Block {
  constructor(props: FileInputProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <input type="file" id="avatar" name="avatar" accept="image/*" class="file-input">
    `;
  }
}
