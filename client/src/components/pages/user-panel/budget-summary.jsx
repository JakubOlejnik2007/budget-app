/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Typography, Button, Container } from "@mui/material";
import TransactionList from "./transaction-list";
import getStartAndEndOfWeek from "../../../utils/calculateWekkDates";
import ReactFrappeChart from "react-frappe-charts";
import { getEntryWeekly } from "../../../fetchers/apiRequestFunctions";
import { callError } from "../../../utils/toast-notifications/toast";
import { AuthData } from "../../../auth/AuthWrapper";
import { useQuery } from "react-query";
import AddEntry from "./addEntry";


const BudgetSummary = ({ budgetid }) => {
    const [date, setDate] = useState(new Date());
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);
    const getEntriesWeeklyQuery = useQuery(
        "entries",
        () => getEntryWeekly(budgetid, startOfWeek.toDateString(), endOfWeek.toDateString(), user.AuthToken),
        { enabled: false }
    );

    let prevStartDate;
    let prevEndDate;

    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (firstRender) {
            console.log("Ten kod zostanie wykonany tylko raz po pierwszym renderowaniu");
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
            console.log("Refetch");
        }
        getEntriesWeeklyQuery.refetch();
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

    if (!getEntriesWeeklyQuery.data)
        return (
            <>
                <h1>Ładowanie...</h1>
            </>
        );

    const entriesWeeklyRaw = getEntriesWeeklyQuery.data.data.raw;
    const entriesWeeklySorted = getEntriesWeeklyQuery.data.data.sorted;
    console.log(entriesWeeklyRaw);
    console.log(entriesWeeklySorted);

    const expenses = [];
    const incomes = [];

    const transformCategorySumsToChartData = (categorySums) => {
        const labels = Object.keys(categorySums);
        const values = Object.values(categorySums);

        const chartData = {
            labels: labels,
            datasets: [
                {
                    values: values,
                },
            ],
        };

        return chartData;
    };

    const categoriesSum = {};

    // Iteracja przez elementy i obliczenie sumy wartości w każdej kategorii
    if (entriesWeeklyRaw)
        entriesWeeklyRaw.forEach((item) => {
            const categoryName = item.category.name;
            const value = item.value;
            if (item.category.isIncome) return;
            if (categoriesSum[categoryName]) {
                categoriesSum[categoryName] += value;
            } else {
                categoriesSum[categoryName] = value;
            }
        });

    const chartData = transformCategorySumsToChartData(categoriesSum);

    console.log(categoriesSum);

    for (let i = 1; i <= 7; i++) {
        let sum1 = 0;
        let sum2 = 0;
        if (entriesWeeklySorted[i % 7])
            entriesWeeklySorted[i % 7].forEach((entry) => {
                console.log(entry.category.isIncome);
                sum1 += entry.category.isIncome ? 0 : entry.value;
                sum2 += entry.category.isIncome ? entry.value : 0;
            });
        expenses.push(sum1);
        incomes.push(sum2);
    }

    return (
        <>
            <AddEntry budgetid={budgetid} />
            <TransactionList entries={entriesWeeklyRaw} />
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    "@media (max-width: 768px)" : {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "1fr 0.5fr",
                        gridGap: "1rem",
                    }
                }}>
                <Button variant="contained" color="warning" onClick={decrementWeek} sx={{
                    "@media (max-width: 768px)" : {
                        gridColumn: "1 / 2",
                        gridRow: 2,
                    }
                }}>
                    Poprzedni
                </Button>
                <Container
                    sx={{
                        textAlign: "center",
                        width: "fit-content",
                        "@media (max-width: 768px)" : {
                            gridColumn: "1 / 3",
                            gridRow: 1,
                        }
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
                <Button variant="contained" color="warning" onClick={incrementWeek} sx={{
                    "@media (max-width: 768px)" : {
                        gridColumn: "2 / 3",
                        gridRow: 2,
                    }
                }}>
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
                data={chartData}
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
