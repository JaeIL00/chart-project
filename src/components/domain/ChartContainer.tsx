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

            <section className="filter-container">
                <div className="title-box">
                    <h5 className="filter-title">차트 필터</h5>
                    <span className="sub-describe">중복 선택</span>
                </div>
                <ul className="filter-btn-list">
                    {filterTextList.map((text) => {
                        const isActive = chooseFilter.includes(text);
                        return (
                            <li key={text}>
                                <button
                                    className={
                                        "filter-btn" +
                                        (isActive ? " active" : "")
                                    }
                                    onClick={clickFilterBtn}
                                >
                                    {text}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </main>
    );
};

export default ChartContainer;
