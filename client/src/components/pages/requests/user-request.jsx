import FormInput from "../../partials/form-input";
import { requestInputs } from "../../../utils/inputlists";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserBudgetsList } from "../../../fetchers/apiRequestFunctions";
import { callError } from "../../../utils/toast-notifications/toast";
import { AuthData } from "../../../auth/AuthWrapper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RequestForm = () => {
    const { user } = AuthData();

    const getBudgetsQuery = useQuery("budgetslist", () => getUserBudgetsList(user.id, user.AuthToken), {
        staleTime: 60000,
    });

    useEffect(() => {
        if (getBudgetsQuery.isError)
            switch (getBudgetsQuery.error.response.status) {
                case 401:
                    callError("Brak autoryzacji!");
                    break;
                case 403:
                    callError("Brak dostępu do tej funkcji!");
                    break;
                case 400:
                    callError("Podany adres email nie może dołączyć do budżetu!");
                    break;
                case 422:
                    callError("Podano błędne dane!");
                    break;
                default:
                    callError("Wystapił błąd!");
            }
    }, [getBudgetsQuery]);

    if (getBudgetsQuery.isError)
        return (
            <>
                            <Typography variant="h2" sx={{
                fontSize: "1.5rem",
                margin: "0.75rem 0"
            }}>Błąd podczas generowania formularza!</Typography>
            </>
        );

    if (getBudgetsQuery.isLoading)
        return (
            <>
                            <Typography variant="h2" sx={{
                fontSize: "1.5rem",
                margin: "0.75rem 0"
            }}>Ładowanie...</Typography>
            </>
        );
    return (
        <>
            <Typography
                variant="h1"
                sx={{
                    fontSize: "2rem",
                    textAlign: "center",
                    padding: "1rem 0",
                }}>
                Zaproś do budżetu
            </Typography>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                {requestInputs.map((item) => (
                    <FormInput key={item.id} name={item.id} {...item} />
                ))}
                <FormControl
                    variant="standard"
                    sx={{
                        width: "30%",
                        margin: "auto",
                    }}>
                    <InputLabel id="demo-simple-select-standard-label">Budżet</InputLabel>
                    <Select
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Budżet">
                        {getBudgetsQuery.data.data.map((item, index) => (
                            <MenuItem key={index} value={item._id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" sx={{
                    margin: "auto",
                    marginTop: "2rem",
                    display: "block",
                    backgroundColor: "#2884ec",
                    color: "#fff",
                    padding: "10px 20px",
                    "&:hover": {
                        backgroundColor: "#2aa4ec",
                        color: "#000",
                    }
                }}
                    onclick={() => { }}>Zaproś</Button>
            </Box>
        </>
    );
};

export default RequestForm;
