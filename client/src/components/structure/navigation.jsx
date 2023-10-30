import urls from "../../utils/urls";
import Homepage from "../pages/homepage";
import LoginSignup from "../pages/login-signup/login-signup";
import UserPanel from "../pages/user-panel/user-panel";

export const nav = [
  {
    id: "1",
    path: urls.client.homepage,
    name: "Strona główna",
    element: <Homepage />,
    isMenu: true,
    isPrivate: false,
  },
  {
    id: "2",
    path: urls.client.login,
    name: "Zaloguj bądź zarejestruj się",
    element: <LoginSignup />,
    isMenu: false,
    isPrivate: false,
  },
  {
    id: "3",
    path: urls.client.userpanel,
    name: "Panel użytkownika",
    element: <UserPanel />,
    isMenu: true,
    isPrivate: false,
  }
];
