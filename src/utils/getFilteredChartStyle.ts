import { ChartData } from "chart.js";
import { ChartDatasetTypes } from "../types";
import { CHART_COLOR, CHART_HOVER_COLOR } from "../constants";

const getFilteredChartStyle = (
    chooseFilter: string[],
    chartData: ChartData<"bar" | "line", ChartDatasetTypes[]>
) => {
    const [barDataset, areaDataset] = chartData.datasets;

    const barBackgroundColor = barDataset.data.map((item) => {
        return chooseFilter.includes(item.y.id)
            ? CHART_HOVER_COLOR.BAR
            : CHART_COLOR.BAR;
    });
    const areaBorderWidth = areaDataset.data.map((item) => {
        return chooseFilter.includes(item.y.id)
            ? CHART_HOVER_COLOR.AREA
            : CHART_COLOR.AREA;
    });

    return {
        barBackgroundColor,
        areaBorderWidth,
    };
};

export default getFilteredChartStyle;
