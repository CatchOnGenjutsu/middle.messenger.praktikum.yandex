import Router from "../../globalClasses/Router";
import { ProfileLinkProps } from "./partials/profileLink/profileLink";

export const profileLinkSettings: ProfileLinkProps = {
  linkText: "Профиль",
  linkClass: "chat-page__aside__profile-link",
  iconClass: "chat-page__aside__profile-link__icon",
  iconUrl: "/icons/profile_icon.png",
  onClick: (event: Event) => {
    const router = Router.getInstance("app");
    router.go("/settings");
    event.preventDefault();
    event.stopPropagation();
  },
};
