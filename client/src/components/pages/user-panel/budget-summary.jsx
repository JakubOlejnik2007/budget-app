import React from "react";
import { Weekly, Yearly, MonthlyCategories } from "./charts";
import { Typography } from "@mui/material";

const BudgetSummary = () => {
    return (<>
        <Typography
            variant="h2"
            sx={{
                fontSize: "2rem",
                textAlign: "left",
            }}>
            Podsumowanie tygodnia
        </Typography>
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