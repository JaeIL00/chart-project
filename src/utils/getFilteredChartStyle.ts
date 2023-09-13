import { ChartDataCustom } from "../types";
import { CHART_COLOR, CHART_FILTER_COLOR } from "../constants";

const getFilteredChartStyle = (
    chooseFilter: string[],
    chartData: ChartDataCustom
) => {
    const [barDataset, areaDataset] = chartData.datasets;

    const barBackgroundColor = barDataset.data.map((item) => {
        return chooseFilter.includes(item.y.id)
            ? CHART_FILTER_COLOR.BAR
            : CHART_COLOR.BAR;
    });
    const areaBorderWidth = areaDataset.data.map((item) => {
        return chooseFilter.includes(item.y.id)
            ? CHART_FILTER_COLOR.AREA
            : CHART_COLOR.AREA;
    });

    return {
        barBackgroundColor,
        areaBorderWidth,
    };
};

export default getFilteredChartStyle;
