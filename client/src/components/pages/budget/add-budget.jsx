import FormInput from "../../partials/form-input";
import { budgetInputs } from "../../../utils/budgetinputs";
import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';

const BudgetForm = () => {
    return (
        <>
            <Typography variant="h1" sx={{
                fontSize: "2rem",
                textAlign: "center",
                padding: "1rem 0",
            }}>Dodaj wydatek</Typography>
            <Box component="form" sx={{
                display: "flex",
                flexDirection: "column",
            }}>
                {
                    budgetInputs.map((item, index) => <FormInput key={index} value={loginFormValues[item.id]} {...item} onChange={onChange} />)
                }
                <Button type="submit" sx={{
                    color: "#ffffff",
                    backgroundColor: "#2884ec",
                    margin: "auto",
                    padding: "10px 20px",
                    "&:hover": {
                        backgroundColor: "#2aa4ec",
                        color: "#000",
                    }
                }}>Dodaj</Button>
            </Box>
            <Typography variant="h1" sx={{
                fontSize: "2rem",
                textAlign: "center",
                padding: "1rem 0",
            }}>Dodaj wydatek</Typography>
            <Box component="form" sx={{
                display: "flex",
                flexDirection: "column",
            }}>
                {
                    expenseInputs.map((item, index) => <FormInput key={index} value={loginFormValues[item.id]} {...item} onChange={onChange} />)
                }
                <Button type="submit" sx={{
                    color: "#ffffff",
                    backgroundColor: "#2884ec",
                    margin: "auto",
                    padding: "10px 20px",
                    "&:hover": {
                        backgroundColor: "#2aa4ec",
                        color: "#000",
                    }
                }}>Dodaj</Button>
        </>
    )
}