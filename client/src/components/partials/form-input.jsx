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
      <TextField value={value} id={id} type={type} onChange={onChange}  label={label} sx={{
        display: "block"
      }
      } />
    </>
  );
};


export default FormInput;
