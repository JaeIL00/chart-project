import { ChartOptions, CoreScaleOptions, Scale } from "chart.js";
import { CHART_COLOR, CHART_LIMIT, CHART_TITLE } from "../constants";
import { TooltipItemTypes } from "../types";

const chartOptions: ChartOptions<"bar" | "line"> = {
    responsive: true,
    scales: {
        bar: {
            display: true,
            position: "left",
            title: {
                display: true,
                text: CHART_TITLE.BAR,
                font: {
                    size: CHART_TITLE.FONT_SIZE,
                },
            },
            grid: {
                color: CHART_COLOR.GRID,
            },
            afterDataLimits: (scale: Scale<CoreScaleOptions>) =>
                (scale.max = scale.max * CHART_LIMIT.BAR),
        },
        area: {
            display: true,
            position: "right",
            title: {
                display: true,
                text: CHART_TITLE.AREA,
                font: {
                    size: CHART_TITLE.FONT_SIZE,
                },
            },
            afterDataLimits: (scale: Scale<CoreScaleOptions>) =>
                (scale.max = scale.max * CHART_LIMIT.AREA),
            beginAtZero: true,
        },
        y: {
            display: false,
        },
        x: {
            grid: {
                color: CHART_COLOR.GRID,
            },
        },
    },
    plugins: {
        filler: {
            propagate: true,
        },
        tooltip: {
            callbacks: {
                beforeBody: (tooltipItem: TooltipItemTypes[]) => {
                    return `id: ${tooltipItem[0].raw.y.id}`;
                },
            },
        },
    },
    interaction: {
        mode: "index",
        intersect: false,
    },
};

export default chartOptions;
