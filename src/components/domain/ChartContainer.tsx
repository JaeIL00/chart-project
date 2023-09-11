import { Chart } from "react-chartjs-2";
import "../../styles/chartContainerStyle.scss";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
} from "chart.js";
import useChartData from "../../hooks/useChartData";
import chartOptions from "../../utils/chartOptions";

ChartJS.register(LinearScale, CategoryScale, BarElement);

const ChartContainer = () => {
    const { chartData } = useChartData();

    return (
        <main>
            {chartData && (
                <Chart type="bar" data={chartData} options={chartOptions} />
            )}
        </main>
    );
};

export default ChartContainer;
