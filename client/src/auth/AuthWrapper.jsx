import { createContext, useContext, useEffect, useState } from "react";
import {
  RenderMenu,
  RenderRoutes,
} from "../components/structure/render-navigation";
import { useNavigate } from "react-router-dom/dist";
import { loginRequest } from "../fetchers/apiRequestFunctions"
import { Container } from "@mui/material";
import { callError, callSuccess } from "../utils/toast-notifications/toast"
const AuthContext = createContext({
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    AuthToken: "",
  },
  login: () => { },
  logout: () => { },
});

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    AuthToken: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userDataFromSession = sessionStorage.getItem("user");
    if (userDataFromSession) {
      const parsedUserData = JSON.parse(userDataFromSession);
      setUser(parsedUserData);
    }
  }, []);

  const setUserData = (user) => {
    setUser({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      AuthToken: user.AuthToken,
    });
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        AuthToken: user.AuthToken,
      })
    );
  }

  const login = async (email, password) => {
    try {
      const response = await loginRequest(email, password);
      console.log(response.response)

      if (response && response.status === 200) {
        setUserData(response.data)
        navigate("/");
        return;
      }



    } catch (error) {
      if (error.response)
        switch (error.response.status) {
          case 422: callError("Nie dostarczono wystarczająco danych do przetworzenia zapytania!"); break;
          case 401: callError("Błędne dane logowania: niepoprawny email lub hasło!"); break;
        }
      callError("Błąd podczas wykonywania zapytania!")
    }
  };




  const logout = async () => {
    sessionStorage.removeItem("user");
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      AuthToken: "",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <RenderMenu />
        <main>
          <Container
            sx={{
              backgroundColor: "white",
              padding: "20px",
              marginTop: "20px",
              "@media (max-width: 768px)": {
                marginX: "0",
              },
            }}
          >
            <RenderRoutes />
          </Container>
        </main>
      </>
    </AuthContext.Provider>
  );
};
