import {useState} from "react";
import { Weekly, Yearly, MonthlyCategories } from "./charts";
import { Typography, Button, Container } from "@mui/material";
import TransactionList from "./transaction-list";
import getStartAndEndOfWeek from "../../../utils/calculateWekkDates"
const BudgetSummary = (budgetid) => {
    const [date, setDate] = useState(new Date());

    const incrementWeek = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 7);
        setDate(newDate);
      };
    
      const decrementWeek = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 7);
        setDate(newDate);
      };


    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date)

    return (
        <>
            <TransactionList />
            <Container sx={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Button variant="contained" color="warning" onClick={decrementWeek}>
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
                        {startOfWeek.toLocaleDateString()} | {endOfWeek.toLocaleDateString()}
                    </Typography>
                </Container>
                <Button variant="contained" color="warning" onClick={incrementWeek}>
                    Następny
                </Button>
            </Container>
            <Weekly />
            <Typography
                variant="h2"
                sx={{
                    fontSize: "2rem",
                    textAlign: "left",
                }}>
                Podsumowanie wydatków z podziałem na kategorie w miesiącu.
            </Typography>
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