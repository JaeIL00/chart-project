import { MouseEvent, useRef } from "react";
import { Chart, getElementsAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, InteractionItem } from "chart.js";

import { chartOptions } from "../../utils";
import { ChartDataCustom } from "../../types";
import { FILTER_TYPE_CHART } from "../../constants";

interface Props {
    chartData: ChartDataCustom;
    updateChooseFilter: (text: string, type: "btn" | "chart") => void;
}

const PaintChart = ({ chartData, updateChooseFilter }: Props) => {
    const chartRef = useRef<ChartJS>(null);

    const getIdClickChart = (clickElement: InteractionItem[]) => {
        if (clickElement.length === 0) return;
        const { datasetIndex, index } = clickElement[0];
        const id = chartData.datasets[datasetIndex].data[index].y.id;
        updateChooseFilter(id, FILTER_TYPE_CHART);
    };

    const clickChart = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!chartRef.current) return;
        const clickElement = getElementsAtEvent(chartRef.current, event);
        getIdClickChart(clickElement);
    };

    return (
        <Chart
            ref={chartRef as any}
            type="bar"
            data={chartData}
            options={chartOptions}
            onClick={clickChart}
        />
    );
};

export default PaintChart;
