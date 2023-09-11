import { ChartDataset } from "chart.js";
import { DistrictSeoulData } from "../types";

const getBarDataset = (data: DistrictSeoulData[]): ChartDataset<"bar"> => {
    return {
        type: "bar",
        label: "bar",
        yAxisID: "bar",
        data: data.map((item) => item.value_bar),
        order: 2,
        backgroundColor: "rgb(53, 162, 235, 0.6)",
    };
};

const getLineDataset = (data: DistrictSeoulData[]): ChartDataset<"line"> => {
    return {
        type: "line",
        label: "area",
        yAxisID: "area",
        data: data.map((item) => item.value_area),
        order: 1,
        backgroundColor: "rgb(252, 27, 121, 0.4)",
        borderColor: "rgb(252, 27, 121)",
        borderWidth: 2,
        pointStyle: false,
        fill: true,
    };
};

const getChartDataset = (
    data: DistrictSeoulData[]
): ChartDataset<"bar" | "line">[] => {
    return [getBarDataset(data), getLineDataset(data)];
};

export default getChartDataset;
