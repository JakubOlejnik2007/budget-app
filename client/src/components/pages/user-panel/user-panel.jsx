import React from "react";
import { Weekly, Yearly, WeeklyCategories } from "./charts";
import { Typography } from "@mui/material";

const UserPanel = () => {
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
            <Typography
                variant="h2"
                sx={{
                    fontSize: "2rem",
                    textAlign: "left",
                }}>
                    Podsumowanie tygodnia
            </Typography>
            <Weekly />
            <WeeklyCategories />
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
    );
}

export default UserPanel;