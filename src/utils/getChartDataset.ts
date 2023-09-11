import { ChartDataset } from "chart.js";
import { DistrictSeoulData } from "../types";
import { CHART_COLOR, CHART_LABElS, CHART_ORDER } from "../constants";

const getBarDataset = (dataArr: DistrictSeoulData[]): ChartDataset<"bar"> => {
    return {
        type: "bar",
        label: CHART_LABElS.BAR,
        yAxisID: CHART_LABElS.BAR,
        data: dataArr.map((item) => item.value_bar),
        order: CHART_ORDER.BAR,
        backgroundColor: CHART_COLOR.BAR,
    };
};

const getLineDataset = (dataArr: DistrictSeoulData[]): ChartDataset<"line"> => {
    return {
        type: "line",
        label: CHART_LABElS.AREA,
        yAxisID: CHART_LABElS.AREA,
        data: dataArr.map((item) => item.value_area),
        order: CHART_ORDER.AREA,
        backgroundColor: CHART_COLOR.AREA,
        borderColor: CHART_COLOR.AREA_BORDER,
        borderJoinStyle: "round",
        borderWidth: 2,
        pointStyle: false,
        fill: true,
    };
};

const getChartDataset = (
    dataArr: DistrictSeoulData[]
): ChartDataset<"bar" | "line">[] => {
    return [getBarDataset(dataArr), getLineDataset(dataArr)];
};

export default getChartDataset;
