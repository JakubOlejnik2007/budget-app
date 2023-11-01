import React, {useState} from "react";
import FormInput from "../../partials/form-input";
import LoginForm from "./login";
import SignUpForm from "./signup";
const LoginSignup = () => {
  const [toggle, setToggle] = useState(true);

  return (<>
    {toggle? <LoginForm /> : <SignUpForm />}
  </>);
};


export default LoginSignup;
