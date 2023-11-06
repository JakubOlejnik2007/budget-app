/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Typography, Button, Container } from "@mui/material";
import TransactionList from "./transaction-list";
import getStartAndEndOfWeek from "../../../utils/calculateWekkDates";
import ReactFrappeChart from "react-frappe-charts";
import { getEntryWeekly } from "../../../fetchers/apiRequestFunctions";
import { callError } from "../../../utils/toast-notifications/toast";
import { AuthData } from "../../../auth/AuthWrapper";
import { useQuery } from "react-query"

const BudgetSummary = ({ budgetid }) => {
    const [date, setDate] = useState(new Date());
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);
    const getEntriesWeeklyQuery = useQuery("entries", () => getEntryWeekly(budgetid, startOfWeek.toDateString(), endOfWeek.toDateString(), user.AuthToken), { enabled: false });


    let prevStartDate;
    let prevEndDate;

    const [firstRender, setFirstRender] = useState(true);


    useEffect(() => {
        if (firstRender) {
            console.log('Ten kod zostanie wykonany tylko raz po pierwszym renderowaniu');
            setFirstRender(false);
            getEntriesWeeklyQuery.refetch();
            prevStartDate = startOfWeek;
            prevEndDate = endOfWeek;
        }
    }, [firstRender]);



    const { user } = AuthData();

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





    useEffect(() => {
        if (prevEndDate !== endOfWeek && prevStartDate !== startOfWeek) {
            getEntriesWeeklyQuery.refetch();
            prevStartDate = startOfWeek;
            prevEndDate = endOfWeek;
            console.log("Refetch")
        }
        getEntriesWeeklyQuery.refetch()
        if (getEntriesWeeklyQuery.isError)
            switch (getEntriesWeeklyQuery.error.response.status) {
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

    }, [date]);

    if (getEntriesWeeklyQuery.isError)
        return (
            <>
                <h1>Błąd podczas generowania formularza!</h1>
            </>
        );

    if (getEntriesWeeklyQuery.isLoading)
        return (
            <>
                <h1>Ładowanie...</h1>
            </>
        );

    if (!getEntriesWeeklyQuery.data) return (<>
        <h1>Ładowanie...</h1>
    </>)

    const entriesWeeklyRaw = getEntriesWeeklyQuery.data.data.raw;
    const entriesWeeklySorted = getEntriesWeeklyQuery.data.data.sorted;
    console.log(entriesWeeklyRaw)
    console.log(entriesWeeklySorted)

    const expenses = []
    const incomes = []


    for (let i = 1; i <= 7; i++) {
        let sum1 = 0;
        let sum2 = 0;
        if (entriesWeeklySorted[i % 7])
            entriesWeeklySorted[i % 7].forEach((entry) => {
                console.log(entry.category.isIncome)
                sum1 += (entry.category.isIncome ? 0 : entry.value);
                sum2 += (entry.category.isIncome ? entry.value : 0);
            })
        expenses.push(sum1)
        incomes.push(sum2)

    }



    return (
        <>
            <TransactionList />
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                <Button variant="contained" color="warning" onClick={decrementWeek}>
                    Poprzedni
                </Button>
                <Container
                    sx={{
                        textAlign: "center",
                        width: "fit-content",
                    }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: "2rem",
                        }}>
                        Podsumowanie tygodnia
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: "1rem",
                        }}>
                        {startOfWeek.toLocaleDateString()} | {endOfWeek.toLocaleDateString()}
                    </Typography>
                </Container>
                <Button variant="contained" color="warning" onClick={incrementWeek}>
                    Następny
                </Button>
            </Container>
            <ReactFrappeChart
                type="bar"
                colors={["#21ba45", "#c00"]}
                axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                height={250}
                data={{
                    labels: ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"],
                    datasets: [
                        { name: "Przychody", values: incomes },
                        { name: "Wydatki", values: expenses },
                    ],
                }}
            />
            <Typography
                variant="h2"
                sx={{
                    fontSize: "2rem",
                    textAlign: "left",
                }}>
                Podsumowanie wydatków z podziałem na kategorie w tygodniu.
            </Typography>
            <ReactFrappeChart
                type="donut"
                colors={["#21ba45", "#c00"]}
                axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                height={250}
                data={{
                    labels: ["Kategorie 1", "Kategorie 2", "Kategorie 3", "Kategorie 4", "Kategorie 5", "Kategorie 6"],
                    datasets: [{ values: [18, 40, 30, 35, 8, 52] }],
                }}
            />
            <Typography
                variant="h2"
                sx={{
                    fontSize: "2rem",
                    textAlign: "left",
                }}>
                Podsumowanie roku
            </Typography>
            <ReactFrappeChart
                type="bar"
                colors={["#21ba45", "#c00"]}
                axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                height={250}
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                    datasets: [
                        { name: "Przychody", values: [18, 40, 30, 35, 8, 52, 17, 4] },
                        { name: "Wydatki", values: [30, 50, 10, 15, 18, 32, 27, 14] },
                    ],
                }}
            />
        </>
    );
};

export default BudgetSummary;
