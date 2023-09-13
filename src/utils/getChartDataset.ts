import { ChartData, ChartDataset } from "chart.js";
import { ChartDatasetTypes, DistrictSeoulValue } from "../types";
import {
    CHART_COLOR,
    CHART_ID,
    CHART_LABElS,
    CHART_ORDER,
    CHART_X_AXES,
    CHART_Y_AXES,
} from "../constants";

const getBarDataset = (
    dataArr: DistrictSeoulValue[],
    axisXLabels: string[]
): ChartDataset<"bar", ChartDatasetTypes[]> => {
    return {
        type: "bar",
        label: CHART_LABElS.BAR,
        yAxisID: CHART_ID.BAR,
        data: axisXLabels.map((item, idx) => ({
            [CHART_X_AXES]: item,
            [CHART_Y_AXES]: dataArr[idx],
        })),
        parsing: {
            xAxisKey: CHART_X_AXES,
            yAxisKey: `${CHART_Y_AXES}.${CHART_LABElS.BAR}`,
        },
        order: CHART_ORDER.BAR,

        backgroundColor: CHART_COLOR.BAR,
        hoverBackgroundColor: CHART_COLOR.HOVER_BAR,
    };
};

const getLineDataset = (
    dataArr: DistrictSeoulValue[],
    axisXLabels: string[]
): ChartDataset<"line", ChartDatasetTypes[]> => {
    return {
        type: "line",
        label: CHART_LABElS.AREA,
        yAxisID: CHART_ID.AREA,
        data: axisXLabels.map((item, idx) => ({
            [CHART_X_AXES]: item,
            [CHART_Y_AXES]: dataArr[idx],
        })),
        parsing: {
            xAxisKey: CHART_X_AXES,
            yAxisKey: `${CHART_Y_AXES}.${CHART_LABElS.AREA}`,
        },
        order: CHART_ORDER.AREA,

        backgroundColor: CHART_COLOR.AREA,
        borderColor: CHART_COLOR.AREA_BORDER,
        borderJoinStyle: "round",
        borderWidth: 2,
        pointBorderWidth: 0,

        pointHoverBorderColor: CHART_COLOR.HOVER_AREA,
        pointHoverBackgroundColor: "transparent",
        pointHoverBorderWidth: 2,

        fill: true,
    };
};

const getChartDataset = (
    dataArr: DistrictSeoulValue[],
    axisXLabels: string[]
): ChartData<"bar" | "line", ChartDatasetTypes[]> => {
    const barDataset = getBarDataset(dataArr, axisXLabels);
    const areaDataset = getLineDataset(dataArr, axisXLabels);
    return { datasets: [barDataset, areaDataset] };
};

export default getChartDataset;
