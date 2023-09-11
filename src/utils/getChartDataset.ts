import { ChartDataset } from "chart.js";
import { DistrictSeoulData } from "../types";

const getBarDataset = (data: DistrictSeoulData[]): ChartDataset<"bar"> => {
    return {
        type: "bar",
        label: "bar",
        backgroundColor: "rgb(53, 162, 235)",
        data: data.map((item) => item.value_bar),
    };
};

const getChartDataset = (data: DistrictSeoulData[]): ChartDataset<"bar">[] => {
    return [getBarDataset(data)];
};

export default getChartDataset;
