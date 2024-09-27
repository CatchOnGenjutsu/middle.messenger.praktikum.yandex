import Block from "../../../../globalClasses/Block";

import "./avatar.scss";

interface AvatarProps {
  isEditData: boolean;
  avatarUrl: string;
  events?: Record<string, (event: Event) => void>;
}
export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return `
      <div class="avatar__container {{#unless isEditData}}avatar__container--editable{{/unless}}">
        {{#if avatarUrl}}
          <img src="{{avatarUrl}}" alt="Аватар пользователя" class="avatar__image">
        {{else}}
          <img class="avatar__image avatar__image_placeholder" src="/icons/avatar_image_icon.png" alt="Фото профиля">
        {{/if}}

        <div class="avatar__overlay">
          <span class="avatar__text">Поменять аватар</span>
        </div>
      </div>
    `;
  }
}
