import Block from "../../globalClasses/Block";
import BackButtonBlock from "./modules/backButtonBlock/BackButtonBlock";
import ProfileFormBlock from "./modules/profileFormBlock/ProfileFormBlock";
import ProfileActionButton from "./partials/profileActionButton/ProfileActionButton";
import { Avatar } from "./partials/avatar/Avatar";
import { Overlay } from "../../components/overlay/Overlay";

import { profilePageViewModeMainDataSettings, profilePageEditPasswordDataSettings } from "./mockData";

import "./profilePage.scss";

export default class ProfilePage extends Block {
  constructor(props: any) {
    console.log(props);
    super({
      ...props,
      editMainData: true,
      BackButtonBlock: new BackButtonBlock(),
      Avatar: new Avatar({
        isEditData: props.isEditData,
        avatarUrl: props.avatarUrl,
        events: {
          click: (event: Event) => {
            event.stopPropagation();
            const elem = this.children.OverlayWithModalWindow;
            console.log(elem);
            if (elem) {
              elem.getContent().classList.toggle("hidden");
            }
          },
        },
      }),
      ProfileFormBlockMainData: new ProfileFormBlock({
        isEditData: props.isEditData,
        inputOptions: {
          ...profilePageViewModeMainDataSettings.inputOptions,
        },
        buttonOptions: props.buttonOptions,
      }),
      ProfileFormBlockPassword: new ProfileFormBlock({
        isEditData: props.isEditData,
        inputOptions: {
          ...profilePageEditPasswordDataSettings.inputOptions,
        },
        buttonOptions: props.buttonOptions,
      }),
      ProfileActionButtons: [
        ...Object.entries(props.actionsButtons).map(
          ([key, value]) =>
            new ProfileActionButton({
              options: { ...(value as Record<string, string>) },
              isLast: key === Object.keys(props.actionsButtons)[Object.keys(props.actionsButtons).length - 1],
            }),
        ),
      ],
      OverlayWithModalWindow: new Overlay({
        ...props.modalWindowSettings,
      }),
    });
    for (const key in props.actionsButtons) {
      this.setEventsByProps(key);
    }
  }

  setEventsByProps(key: string): void {
    const elem = this.lists.ProfileActionButtons.find((item) => item.props.options.key === key);
    console.log(elem);
    if (elem) {
      switch (key) {
        case "exit":
          elem.setProps({
            events: {
              click: (event: Event) => {
                event.stopPropagation();
                console.log("click", key);
                window.location.href = "/login";
              },
            },
          });
          break;
        case "editData":
          elem.setProps({
            events: {
              click: (event: Event) => {
                event.stopPropagation();
                this.setProps({
                  isEditData: true,
                  editMainData: true,
                  // inputOptions: { ...profilePageViewModeMainDataSettings.inputOptions },
                });
              },
            },
          });
          break;
        case "editPassword":
          elem.setProps({
            events: {
              click: (event: Event) => {
                event.stopPropagation();
                console.log("click", key);
                this.setProps({
                  isEditData: true,
                  editMainData: false,
                  // inputOptions: { ...profilePageEditPasswordDataSettings.inputOptions },
                });
              },
            },
          });
        default:
          break;
      }
    }
  }

  protected render(): string {
    return `
      <div id="profile-page" class="profile-page">
        <aside class="profile-page__aside">
          {{{ BackButtonBlock }}}
        </aside>
        <main class="profile-page__main-content">
          <div class="profile-page__main-content__avatar-wrapper">
            {{{ Avatar }}}
            {{#unless isEditData}}
              <h1 class="profile-page__main-content__name">{{inputOptions.first_name.value}}</h1>
            {{/unless}}
          </div>
          {{#if editMainData}}
            {{{ ProfileFormBlockMainData }}}
          {{else}}
            {{{ ProfileFormBlockPassword }}}
          {{/if}}
          {{#unless isEditData}}
            {{{ ProfileActionButtons }}}
          {{/unless}}
          {{{ OverlayWithModalWindow }}}
        </main>
      </div>
    `;
  }
}
