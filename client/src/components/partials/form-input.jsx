/* eslint-disable react/prop-types */
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
      <TextField value={value} id={id} name={id} type={type} onChange={onChange} label={label} required={false} sx={{
        display: "block",
        margin: "15px auto"
      }
      } />
    </>
  );
};


export default FormInput;
