/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Typography, FormControl, Select, InputLabel, MenuItem, Container } from "@mui/material";
import { getCategories, addEntry } from "../../../fetchers/apiRequestFunctions";
import { budgetInputs } from "../../../utils/budgetInputs";
import { useQuery } from "react-query";
import { callError, callSuccess } from "../../../utils/toast-notifications/toast";
import FormInput from "../../partials/form-input"
import { AuthData } from "../../../auth/AuthWrapper";
import axios from 'axios';
import config from "../../../utils/config"

const AddEntry = ({ budgetid }) => {
    const [show, setShow] = useState(true);
    const [image, setImage] = useState(null);
    const [entryValues, setEntryValues] = useState({
        categoryid: "",
        description: "",
        value: ""
    })



    const handleFileChange = async (e) => {
        console.log("Change!")
        const file = e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(`${config.backend}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setImage(response.data.name)
                setEntryValues(prevState => {
                    return {...prevState, value: parseInt(response.data.value)}
                })
                console.log('Plik został pomyślnie przesłany na serwer:', response.data);
            } catch (error) {
                console.error('Błąd podczas przesyłania pliku na serwer:', error);
            }
        }
    };


    const onChange = (e) => {
        e.preventDefault();
        setEntryValues({
            ...entryValues,
            [e.target.name]: e.target.value
        })
    }

    const handleReset = () => {
        setEntryValues(prevState => {
            return {
                ...prevState,
                description: "",
                value: ""
            }
        })
    }

    const { user } = AuthData();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(entryValues)

        try {
            await addEntry(user.AuthToken, user.id, budgetid, entryValues.categoryid, entryValues.description, entryValues.value);
            handleReset()
            callSuccess("Wpis został dodany!")
        } catch (error) {
            callError('Błąd podczas dodawania wpisu!')
        }
    }

    const getCategoriesQuery = useQuery("getCategories", getCategories, { staleTime: 60000 });




    useEffect(() => {
        if (getCategoriesQuery.isError)
            switch (getCategoriesQuery.error.response.status) {
                case 422:
                    callError("Podano błędne dane!");
                    break;
                default:
                    callError("Wystapił błąd!");
            }
    }, [getCategoriesQuery]);

    if (getCategoriesQuery.isError)
        return (
            <>
                <h1>Błąd podczas generowania formularza!</h1>
            </>
        );

    if (getCategoriesQuery.isLoading)
        return (
            <>
                <h1>Ładowanie...</h1>
            </>
        );

    return (
        <>
            {show ? (
                <Button
                    onClick={() => {
                        setShow(!show);
                    }}
                    type="submit"
                    sx={{
                        margin: "auto",
                        marginTop: "1rem",
                        display: "block",
                        backgroundColor: "#2884ec",
                        color: "#fff",
                        padding: "10px 20px",
                        "&:hover": {
                            backgroundColor: "#2aa4ec",
                            color: "#000",
                        },
                    }}>
                    Dodaj wpis
                </Button>
            ) : (
                <Container component="form" onSubmit={onSubmit}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: "2rem",
                            textAlign: "center",
                            padding: "1rem 0",
                        }}>
                        Dodaj wpis
                    </Typography>
                    <FormInput id="entry-image" name="image" type="file" accept="image/*" onChange={handleFileChange} required={false}/>
                    {budgetInputs.map((item, index) => (
                        <FormInput key={index} value={entryValues[item.id]} {...item} onChange={onChange} />
                    ))}
                    <FormControl
                        variant="standard"
                        sx={{
                            width: "30%",
                            margin: "auto",
                        }}>
                        <InputLabel id="label">Kategoria</InputLabel>
                        <Select name="categoryid" onChange={onChange} value={entryValues.categoryid} required={true}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            labelId="label"
                            label="Kategoria">
                            {getCategoriesQuery.data.data.map((item, index) => (
                                <MenuItem key={index} value={item._id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
            )}
        </>
    );
};

export default AddEntry;
