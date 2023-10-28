import { useState } from "react";
import { TextField } from "@mui/material";

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  id = Math.random(),
}) => {
  return (
    <>
      <TextField id={id} type={type} onChange={onChange} value={value} label={label}/>
    </>
  );
};

export default FormInput;
