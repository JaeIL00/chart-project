import { ChartDataset } from "chart.js";
import { ChartDatasetTypes, DistrictSeoulValue } from "../types";
import {
    CHART_COLOR,
    CHART_HOVER_COLOR,
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
            yAxisKey: `${CHART_Y_AXES}.value_bar`,
        },
        order: CHART_ORDER.BAR,

        backgroundColor: CHART_COLOR.BAR,
        hoverBackgroundColor: CHART_HOVER_COLOR.BAR,
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
            yAxisKey: `${CHART_Y_AXES}.value_area`,
        },
        order: CHART_ORDER.AREA,

        backgroundColor: CHART_COLOR.AREA,
        borderColor: CHART_COLOR.AREA_BORDER,
        borderJoinStyle: "round",
        borderWidth: 2,
        pointBorderWidth: 0,

        pointHoverBorderColor: CHART_HOVER_COLOR.AREA,
        pointHoverBackgroundColor: CHART_HOVER_COLOR.AREA,
        pointHoverBorderWidth: 2,

        fill: true,
    };
};

const getChartDataset = (
    dataArr: DistrictSeoulValue[],
    axisXLabels: string[]
): ChartDataset<"bar" | "line", ChartDatasetTypes[]>[] => {
    return [
        getBarDataset(dataArr, axisXLabels),
        getLineDataset(dataArr, axisXLabels),
    ];
};

export default getChartDataset;
