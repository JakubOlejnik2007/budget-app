import FormInput from "../../partials/form-input";
import { signUpInputs } from "../../../utils/inputlists";
import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import { registerRequest } from "../../../fetchers/apiRequestFunctions"

const SignupForm = () => {
  const navigate = useNavigate();

  const [signupFormValues, setSignupFormValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  })

  const onChange = (e) => {
    setSignupFormValues({ ...signupFormValues, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !signupFormValues.email,
      !signupFormValues.firstName,
      !signupFormValues.lastName,
      !signupFormValues.password,
      !signupFormValues.confirmPassword
    ) {
      callError("Wprowadź dane do formularza!");
      return;
    }

    if (signupFormValues.password !== signupFormValues.confirmPassword) {
      callError("Hasła nie są takie same!");
      return;
    }

    try {
      console.log({ ...signupFormValues })
      const response = await registerRequest({ ...signupFormValues });
      if (response.status === 200) callSuccess("Pomyślnie zarejestrowano!")
      navigate("/logowanie")
    } catch (error) {
      console.log(error)
      callError("Błąd podczas rejestracji!");
      if (error.response) switch (error.response.status) {
        case 422: callError("Nie dostarczono wystarczająco danych do przetworzenia zapytania!"); break;
        case 409: callError("Konto o podanym adresie już istnieje!")
      }
    }

  }

  return (
    <>
      <Typography variant="h1" sx={{
        fontSize: "2rem",
        textAlign: "center",
        padding: "1rem 0",
      }}>Rejestracja</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{
        display: "flex",
        flexDirection: "column"
      }}>
        {
          signUpInputs.map((item, index) => <FormInput key={index} value={signupFormValues[item.id]} {...item} onChange={onChange} />)
        }
        <Button type="submit" sx={{
          color: "#ffffff",
          backgroundColor: "#2884ec",
          margin: "auto",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#2aa4ec",
            color: "#000",
          }
        }}>Zarejestruj się</Button>
      </Box>
      <Button sx={{
        margin: "auto",
        marginTop: "6rem",
        display: "block",
      }} onClick={() => {
        navigate("/logowanie")
      }}>Przejdź do logowania!</Button>
    </>
  );
}

export default SignupForm;