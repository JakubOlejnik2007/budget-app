import FormInput from "../../partials/form-input";
import {loginInputs} from "../../../utils/inputlists";
import { Box } from "@mui/material"
const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted")
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {
        loginInputs.map((item, index)=> <FormInput key={index} value="" {...item} onChange={()=>{}}  /> )
      }
    </Box>
  );
};

export default LoginForm;