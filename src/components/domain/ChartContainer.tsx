import { MouseEvent, useRef, useState } from "react";
import { Chart, getElementsAtEvent } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Legend,
    Tooltip,
    InteractionItem,
} from "chart.js";

import ChartFilter from "./ChartFilter";
import { useChartData } from "../../hooks";
import { chartOptions } from "../../utils";
import { FILTER_TYPE_BTN, FILTER_TYPE_CHART, FIND_FAIL } from "../../constants";

import "../../styles/chartContainerStyle.scss";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Legend,
    Tooltip
);

const ChartContainer = () => {
    const chartRef = useRef<ChartJS>(null);

    const [chooseFilter, setChooseFilter] = useState<string[]>([]);

    const { chartData, filterTextList } = useChartData(chooseFilter);

    const updateChooseFilter = (text: string, type: string) => {
        const findIdx = chooseFilter.findIndex(
            (filterText) => filterText === text
        );
        if (findIdx !== FIND_FAIL) {
            const freshChooseFilter = chooseFilter.filter(
                (_, idx) => idx !== findIdx
            );
            setChooseFilter(() => {
                return type === "btn" ? freshChooseFilter : [];
            });
        } else {
            setChooseFilter((prev) => {
                return type === "btn" ? [...prev, text] : [text];
            });
        }
    };

    const getIdClickChart = (clickElement: InteractionItem[]) => {
        if (clickElement.length === 0) return;
        const { datasetIndex, index } = clickElement[0];
        const id = chartData.datasets[datasetIndex].data[index].y.id;
        updateChooseFilter(id, FILTER_TYPE_CHART);
    };

    const clickFilterBtn = (event: MouseEvent<HTMLButtonElement>) => {
        const text = event.currentTarget.textContent;
        if (!text) return;
        updateChooseFilter(text, FILTER_TYPE_BTN);
    };

    const clickChart = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!chartRef.current) return;
        const clickElement = getElementsAtEvent(chartRef.current, event);
        getIdClickChart(clickElement);
    };

    return (
        <main>
            {chartData && (
                <Chart
                    ref={chartRef as any}
                    type="bar"
                    data={chartData}
                    options={chartOptions}
                    onClick={clickChart}
                />
            )}

            <ChartFilter
                filterTextList={filterTextList}
                chooseFilter={chooseFilter}
                clickFilterBtn={clickFilterBtn}
            />
        </main>
    );
};

export default ChartContainer;
