import FormInput from "../../partials/form-input";
import { loginInputs } from "../../../utils/inputlists";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthData } from "../../../auth/AuthWrapper";
import { callError } from "../../../utils/toast-notifications/toast";

const LoginForm = () => {

  const { login } = AuthData();

  const navigate = useNavigate();

  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: ""
  })

  const onChange = (e) => {
    setLoginFormValues({ ...loginFormValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !loginFormValues.email ||
      !loginFormValues.password
    ) {
      callError("Wprowadź dane do formularza!");
      return;
    }
    login(loginFormValues.email, loginFormValues.password)
    console.log("Submitted");
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{
        display: "flex",
        flexDirection: "column"
      }}>
        {
          loginInputs.map((item, index) => <FormInput key={index} value={loginFormValues[item.id]} {...item} onChange={onChange} />)
        }
        <Button type="submit" sx={{

        }}>Zaloguj się</Button>
      </Box>

      <Button onClick={() => {
        navigate("/rejestracja")
      }}>Przejdź do rejestracji!</Button>
    </>
  );
};

export default LoginForm;