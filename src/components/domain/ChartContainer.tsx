import { Chart } from "react-chartjs-2";
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
} from "chart.js";

import useChartData from "../../hooks/useChartData";
import { chartOptions } from "../../utils";

import "../../styles/chartContainerStyle.scss";
import { MouseEvent, useState } from "react";
import ChartFilter from "./ChartFilter";

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
    const [chooseFilter, setChooseFilter] = useState<string[]>([]);

    const { chartData, filterTextList } = useChartData(chooseFilter);

    const clickFilterBtn = (event: MouseEvent<HTMLButtonElement>) => {
        const text = event.currentTarget.textContent;
        if (!text) return;

        const findIdx = chooseFilter.findIndex(
            (filterText) => filterText === text
        );
        if (findIdx !== -1) {
            const freshChooseFilter = chooseFilter.filter(
                (_, idx) => idx !== findIdx
            );
            setChooseFilter(freshChooseFilter);
        } else setChooseFilter((prev) => [...prev, text]);
    };

    return (
        <main>
            {chartData && (
                <Chart type="bar" data={chartData} options={chartOptions} />
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
