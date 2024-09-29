import Block from "../../globalClasses/Block";

import "./errorPage.scss";

interface ErrorPageProps {
  title: string;
  description: string;
}

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <main class="error-page">
        <h1 class="error-page__title">{{title}}</h1>
        <p class="error-page__description">{{description}}</p>
        <a class="error-page__link" href="/chat-page">Назад к чатам</a>
      </main>
    `;
  }
}
