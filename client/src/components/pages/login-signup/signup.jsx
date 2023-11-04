import FormInput from "../../partials/form-input";
import { signUpInputs } from "../../../utils/inputlists";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const SignupForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
  }

  const navigate = useNavigate();

  const [signupFormValues, setSignupFormValues] = useState({
    email: "",
    password: ""
  })

  const onChange = (e) => {
    setSignupFormValues({ ...signupFormValues, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{
        display: "flex",
        flexDirection: "column"
      }}>
        {
          signUpInputs.map((item, index) => <FormInput key={index} value={signupFormValues[item.id]} {...item} onChange={onChange} />)
        }
        <Button type="submit" sx={{

        }}>Zaloguj się</Button>
      </Box>
      <Button onClick={() => {
        navigate("/logowanie")
      }}>Przejdź do logowania!</Button>
    </>
  );
}

export default SignupForm;