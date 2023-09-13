import { ChartContainer } from "../components/domain";
import {
    Chart,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Legend,
    Tooltip,
} from "chart.js";

Chart.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Legend,
    Tooltip
);

const MainPage = () => {
    return <ChartContainer />;
};

export default MainPage;
