import {useState} from "react";
import LoginForm from "./login";
import SignUpForm from "./signup";
import Button from '@mui/material/Button';

const LoginSignup = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault()
    setToggle(!toggle)
    console.log("clicked")
  }

  return (<>
    {toggle ? <LoginForm /> : <SignUpForm />}
    <Button onClick={handleToggle}>{toggle ? "Zarejestruj się" : "Zaloguj się"}</Button>
  </>);
};


export default LoginSignup;
