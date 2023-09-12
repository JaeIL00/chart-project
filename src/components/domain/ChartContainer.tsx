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
    const { chartData, filterTextList } = useChartData();

    return (
        <main>
            {chartData && (
                <Chart type="bar" data={chartData} options={chartOptions} />
            )}
        </main>
    );
};

export default ChartContainer;
