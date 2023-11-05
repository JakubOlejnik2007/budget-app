import React from "react";
import { Weekly, Yearly, MonthlyCategories } from "./charts";
import { Typography, Button, Container, Grid } from "@mui/material";

const BudgetSummary = () => {
    return (
        <>
            <Container sx={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Button variant="contained" color="warning">
                    Poprzedni
                </Button>
                <Container sx={{
                    textAlign: "center",
                    width: "fit-content"
                }} >
                    <Typography variant="h2" sx={{
                        fontSize: "2rem",
                    }}>
                        Podsumowanie tygodnia
                    </Typography>
                    <Typography variant="h3" sx={{
                        fontSize: "1rem",
                    }}>
                        Tu wstaw datę początku i końca tygodnia
                    </Typography>
                </Container>
                <Button variant="contained" color="warning">
                    Następny
                </Button>
            </Container>
            <Weekly />
            <MonthlyCategories />
            <Typography
                variant="h2"
                sx={{
                    fontSize: "2rem",
                    textAlign: "left",
                }}>
                Podsumowanie roku
            </Typography>
            <Yearly />
        </>
    )
}

export default BudgetSummary;