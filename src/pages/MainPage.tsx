import { ChartContainer } from '../components/domain';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  LineController,
  LinearScale,
  LineElement,
  CategoryScale,
  BarController,
  BarElement,
  PointElement,
  Filler,
  Legend,
  Tooltip,
);

const MainPage = () => {
  return <ChartContainer />;
};

export default MainPage;
