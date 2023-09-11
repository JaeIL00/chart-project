import { Chart } from "react-chartjs-2";
import "../../styles/chartContainerStyle.scss";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
} from "chart.js";
import getFormatDateString from "../../utils/getFormatDateString";
import { getDistrictSeoulApi } from "../../apis/districtSeoul";
import { DistrictSeoulData, DistrictSeoulResponse } from "../../types";

ChartJS.register(LinearScale, CategoryScale, BarElement);

const ChartContainer = () => {
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<DistrictSeoulData[]>([]);

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

    const formatFetchResponse = (data: DistrictSeoulResponse) => {
        const dateArr = Object.keys(data.response);
        const dataArr = Object.values(data.response);

        const formatDateArr = dateArr.map((item) => {
            const date = new Date(item);
            return getFormatDateString(date);
        });

        setLabels(formatDateArr);
        setData(dataArr);
    };

    const fetch = async () => {
        await getDistrictSeoulApi().then(({ data }) =>
            formatFetchResponse(data)
        );
    };

    useEffect(() => {
        fetch();
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
