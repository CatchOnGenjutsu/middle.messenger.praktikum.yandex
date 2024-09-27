import Block from "../../../../globalClasses/Block";
import "./searchInput.scss";

export default class SearchInput extends Block {
  constructor() {
    super({
      events: {
        focus: (event: Event) => {
          const target = event.target as HTMLInputElement;
          target.value = "";
        },
        blur: (event: Event) => {
          const target = event.target as HTMLInputElement;
          target.value = "";
        },
      },
    });
  }

  render() {
    return `
      <input type="text" class="search-input" placeholder="Поиск"/>
    `;
  }
}
