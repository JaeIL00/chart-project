import { ChartOptions, CoreScaleOptions, Scale } from "chart.js";

const chartOptions: ChartOptions<"bar" | "line"> = {
    responsive: true,
    scales: {
        bar: {
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
        area: {
            display: true,
            position: "right",
            title: {
                display: true,
                text: "Area",
                font: {
                    size: 14,
                },
            },
            max: 200,
            beginAtZero: true,
        },
        y: {
            display: false,
        },
    },
    plugins: {
        filler: {
            propagate: true,
        },
    },
};

export default chartOptions;
