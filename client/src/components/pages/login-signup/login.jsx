import FormInput from "../../partials/form-input";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <FormInput id="email" type="email" label="Email" onChange={()=>{}} value="" />
      <FormInput id="password" type="password" label="Hasło" onChange={()=>{}} value=""/>
      <button id="submit">Zaloguj</button>
    </form>
  );
};

export default LoginForm;