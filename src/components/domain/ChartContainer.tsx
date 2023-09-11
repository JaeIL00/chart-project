import { Chart } from "react-chartjs-2";
import "../../styles/chartContainerStyle.scss";
import mockData from "../../mock/data.json";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
} from "chart.js";
import getFormatDateString from "../../utils/getFormatDateString";

ChartJS.register(LinearScale, CategoryScale, BarElement);

const ChartContainer = () => {
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<
        { id: string; value_area: number; value_bar: number }[]
    >([]);

    const [chartData, setChartData] = useState<any>();

    useEffect(() => {
        if (data.length > 0) {
            setChartData({
                labels,
                datasets: [
                    {
                        type: "bar",
                        label: "bar",
                        backgroundColor: "rgb(53, 162, 235)",
                        data: data.map((item) => item.value_bar),
                    },
                ],
            });
        }
    }, [data]);

    useEffect(() => {
        const dateArr = Object.keys(mockData.response);
        const formatDateArr = dateArr.map((item) => {
            const date = new Date(item);
            return getFormatDateString(date);
        });
        const dataArr = Object.values(mockData.response);
        setLabels(formatDateArr);
        setData(dataArr);
    }, []);
    return (
        <main>
            {chartData && (
                <Chart
                    type="bar"
                    data={chartData}
                    options={{
                        responsive: true,
                        scales: {
                            bar: {
                                axis: "y",
                                display: true,
                                position: "left",
                                title: {
                                    display: true,
                                    text: "Bar",
                                    font: {
                                        size: 14,
                                    },
                                },
                                afterDataLimits: (scale) =>
                                    (scale.max = scale.max * 1.2),
                            },
                            y: {
                                display: false,
                            },
                        },
                    }}
                />
            )}
            <></>
        </main>
    );
};

export default ChartContainer;
