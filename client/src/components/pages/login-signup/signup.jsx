import FormInput from "../../partials/form-input";
import { signUpInputs } from "../../../utils/inputlists";
import { Box } from "@mui/material";

const SignupForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {
        signpInputs.map((item, index) => <FormInput key={index} value="" {...item} onChange={() => { }} />)
      }
    </Box>
  );
}

export default SignupForm;