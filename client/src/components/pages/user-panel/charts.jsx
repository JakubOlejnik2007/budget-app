import React from "react";
import ReactFrappeChart from "react-frappe-charts";

export const Weekly = () => {
    return (
        <ReactFrappeChart
            type="bar"
            colors={["#21ba45", "#c00"]}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
            height={250}
            data={{
                labels: ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"],
                datasets: [{ name: "Przychody", values: [18, 40, 30, 35, 8, 52, 17, 4] },
                { name: "Wydatki", values: [30, 50, 10, 15, 18, 32, 27, 14] }],
            }}
        />
    );
}

export const MonthlyCategories = () => {
    return (
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
    );
}

export const Yearly = () => {
    return (
        <ReactFrappeChart
            type="bar"
            colors={["#21ba45", "#c00"]}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
            height={250}
            data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                datasets: [{ name: "Przychody", values: [18, 40, 30, 35, 8, 52, 17, 4] },
                { name: "Wydatki", values: [30, 50, 10, 15, 18, 32, 27, 14] }],
            }}
        />
    );
}