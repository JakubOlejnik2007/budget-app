import { Typography, Container, Button } from "@mui/material";
import DropdownMenu from "../../structure/dropdown-menu";
import FormInput from "../../partials/form-input"
import {useState} from "react";
import { createBudget } from "../../../fetchers/apiRequestFunctions";
import {AuthData} from "../../../auth/AuthWrapper"
import {callError, callSuccess} from "../../../utils/toast-notifications/toast"

const UserPanel = () => {

    const [budgetName, setBudgetName] = useState("")

    const { user } = AuthData();
    console.log(user)
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(user.id)
            await createBudget (user.AuthToken, user.id, budgetName);
            callSuccess("Powodzenie podczas dodawania budżetu!")
        } catch (error) {
            console.log(error)
            callError("Błąd podczas dodawania budżetu!")
        }
        
    }

    return (
        <>
            <Typography
                variant="h1"
                sx={{
                    fontSize: "3rem",
                    textAlign: "center",
                }}>
                Panel użytkownika
            </Typography>
            
            <Container component="form" onSubmit={onSubmit}>
                <Typography variant="h2" sx={{
                fontSize: "1.5rem",
                margin: "0.75rem 0"
            }}>Dodaj nowy budżet!</Typography>
                <FormInput type="text" name="name" id="name" label="Nazwa" value={budgetName} onChange={(e)=>setBudgetName(e.target.value)} />
                <Button
                        type="submit"
                        sx={{
                            display: "block",
                            color: "#ffffff",
                            backgroundColor: "#2884ec",
                            margin: "auto",
                            padding: "10px 20px",
                            "&:hover": {
                                backgroundColor: "#2aa4ec",
                                color: "#000",
                            },
                        }}>
                        Dodaj
                    </Button>
            </Container>
            <Typography variant="h2" sx={{
                fontSize: "1.5rem",
                margin: "0.75rem 0"
            }}>Przeglądaj szczegóły swoich budżetów!</Typography>
            <DropdownMenu />
        </>
    );
};

export default UserPanel;
