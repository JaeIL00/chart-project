import { ChartOptions, CoreScaleOptions, Scale } from "chart.js";
import { CHART_LIMIT } from "../constants";

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
                (scale.max = scale.max * CHART_LIMIT.BAR),
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
            afterDataLimits: (scale: Scale<CoreScaleOptions>) =>
                (scale.max = scale.max * CHART_LIMIT.AREA),
            beginAtZero: true,
        },
        y: {
            display: false,
        },
    },
    plugins: {
        filler: {
            propagate: true,
            drawTime: "beforeDatasetsDraw",
        },
    },
};

export default chartOptions;
