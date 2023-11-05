/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { Select } from '@mui/base/Select';

const FormSelect = ({
  label,
  value,
  onChange,
  type = "select",
  id = Math.random()
}) => {
  return (
    <>
      <TextField value={value} id={id} name={id} type={type} onChange={onChange} label={label} required={true} sx={{
        display: "block",
        margin: "15px auto"
      }
      } />
    </>
  );
};


export default FormSelect;
