import { ChartDataset } from "chart.js";
import { DistrictSeoulData } from "../types";
import { CHART_COLOR, CHART_LABElS, CHART_ORDER } from "../constants";

const getBarDataset = (data: DistrictSeoulData[]): ChartDataset<"bar"> => {
    return {
        type: "bar",
        label: CHART_LABElS.BAR,
        yAxisID: CHART_LABElS.BAR,
        data: data.map((item) => item.value_bar),
        order: CHART_ORDER.BAR,
        backgroundColor: CHART_COLOR.BAR,
    };
};

const getLineDataset = (data: DistrictSeoulData[]): ChartDataset<"line"> => {
    return {
        type: "line",
        label: CHART_LABElS.AREA,
        yAxisID: CHART_LABElS.AREA,
        data: data.map((item) => item.value_area),
        order: CHART_ORDER.AREA,
        backgroundColor: CHART_COLOR.AREA,
        borderColor: CHART_COLOR.AREA,
        borderJoinStyle: "round",
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
