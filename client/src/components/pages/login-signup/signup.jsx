import React from "react";
import FormInput from "../../partials/form-input";

const SignupForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return(
    <form onSubmit={handleSubmit}>
      <FormInput id="imie" type="text" label="Imię" onChange={()=>{}} value="" />
      <FormInput id="nazwisko" type="text" label="Nazwisko" onChange={()=>{}} value="" />
      <FormInput id="email" type="email" label="Email" onChange={()=>{}} value="" />
      <FormInput id="password" type="text" label="Hasło" onChange={()=>{}} value="" />
      <FormInput id="confirm-password" type="text" label="Potwierdź hasło" onChange={()=>{}} value="" />
    </form>
  )
}

export default SignupForm;