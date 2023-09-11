import { ChartDataset } from "chart.js";
import { DistrictSeoulData } from "../types";
import { CHART_COLOR } from "../constants";

const getBarDataset = (data: DistrictSeoulData[]): ChartDataset<"bar"> => {
    return {
        type: "bar",
        label: "bar",
        yAxisID: "bar",
        data: data.map((item) => item.value_bar),
        order: 2,
        backgroundColor: CHART_COLOR.BAR,
    };
};

const getLineDataset = (data: DistrictSeoulData[]): ChartDataset<"line"> => {
    return {
        type: "line",
        label: "area",
        yAxisID: "area",
        data: data.map((item) => item.value_area),
        order: 1,
        backgroundColor: CHART_COLOR.AREA,
        borderColor: CHART_COLOR.AREA,
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
