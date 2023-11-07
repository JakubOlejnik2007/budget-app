import urls from "../../utils/urls";
import Homepage from "../pages/homepage";
import LoginForm from "../pages/login-signup/login";
import SignupForm from "../pages/login-signup/signup";
import UserPanel from "../pages/user-panel/user-panel";
import RequestForm from "../pages/requests/user-request";

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
    name: "Zaloguj się",
    element: <LoginForm />,
    isMenu: false,
    isPrivate: false,
  },
  {
    id: "3",
    path: urls.client.register,
    name: "Zarejestruj się",
    element: <SignupForm />,
    isMenu: false,
    isPrivate: false,
  },
  {
    id: "4",
    path: urls.client.userpanel,
    name: "Panel użytkownika",
    element: <UserPanel />,
    isMenu: true,
    isPrivate: true,
  },
  {
    id:"5",
    path: urls.client.requestForm,
    name: "Zaproś do budżetu",
    element: <RequestForm />,
    isMenu: true,
    isPrivate: true,
  }
];
