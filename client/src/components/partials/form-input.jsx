/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  id = Math.random(),
  required=true
}) => {
  return (
    <>
      <TextField required={required} value={value} id={id} name={id} type={type} onChange={onChange} label={label}  sx={{
        display: "block",
        margin: "15px auto"
      }
      } />
    </>
  );
};


export default FormInput;
