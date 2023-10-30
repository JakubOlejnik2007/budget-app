import React from "react";
import ReactFrappeChart from "react-frappe-charts";

export default function MyChart() {
    return (
        <ReactFrappeChart
            type="bar"
            colors={["#21ba45", "#c00"]}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
            height={250}
            data={{
                labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{ name: "Przychody", values: [18, 40, 30, 35, 8, 52, 17, 4] },
                { name: "Wydatki", values: [30, 50, 10, 15, 18, 32, 27, 14] }],
            }}
        />
    );
}