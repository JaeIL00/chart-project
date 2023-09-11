import { ChartOptions, CoreScaleOptions, Scale } from "chart.js";

const chartOptions: ChartOptions<"bar"> = {
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
            afterDataLimits: (scale: Scale<CoreScaleOptions>) =>
                (scale.max = scale.max * 1.2),
        },
        y: {
            display: false,
        },
    },
};

export default chartOptions;
