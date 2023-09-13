import { ChartDataCustom } from "../types";
import { CHART_COLOR, CHART_FILTER_COLOR } from "../constants";

const getFilteredChartStyle = (
    chooseFilter: string[],
    chartData: ChartDataCustom
) => {
    const [barDataset, areaDataset] = chartData.datasets;

    const styleHandler = (id: string, styleId: "BAR" | "AREA") => {
        return chooseFilter.includes(id)
            ? CHART_FILTER_COLOR[styleId]
            : CHART_COLOR[styleId];
    };

    const barBackgroundColor = barDataset.data.map((item) => {
        return styleHandler(item.y.id, "BAR");
    });
    const areaBorderWidth = areaDataset.data.map((item) => {
        return styleHandler(item.y.id, "AREA");
    });

    return {
        barBackgroundColor,
        areaBorderWidth,
    };
};

export default getFilteredChartStyle;
