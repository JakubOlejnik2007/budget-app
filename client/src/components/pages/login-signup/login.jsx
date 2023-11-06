import FormInput from "../../partials/form-input";
import { loginInputs } from "../../../utils/inputlists"; 
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthData } from "../../../auth/AuthWrapper";
import { callError } from "../../../utils/toast-notifications/toast";
import { HolidayVillage, Spa } from "@mui/icons-material";

const LoginForm = () => {
    const { login } = AuthData();

    const navigate = useNavigate();

    const [loginFormValues, setLoginFormValues] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setLoginFormValues({ ...loginFormValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!loginFormValues.email || !loginFormValues.password) {
            callError("Wprowadź dane do formularza!");
            return;
        }
        login(loginFormValues.email, loginFormValues.password);
        console.log("Submitted");
    };

    return (
        <>
            <Typography
                variant="h1"
                sx={{
                    fontSize: "2rem",
                    textAlign: "center",
                    padding: "1rem 0",
                }}>
                Logowanie
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                {loginInputs.map((item, index) => (
                    <FormInput key={index} value={loginFormValues[item.id]} {...item} onChange={onChange} />
                ))}
                <Button
                    type="submit"
                    sx={{
                        color: "#ffffff",
                        backgroundColor: "#2884ec",
                        margin: "auto",
                        padding: "10px 20px",
                        "&:hover": {
                            backgroundColor: "#2aa4ec",
                            color: "#000",
                        },
                    }}>
                    Zaloguj się
                </Button>
            </Box>

            <Button
                sx={{
                    margin: "auto",
                    marginTop: "6rem",
                    display: "block",
                }}
                onClick={() => {
                    navigate("/rejestracja");
                }}>
                Przejdź do rejestracji!
            </Button>
        </>
    );
};

export default LoginForm;
