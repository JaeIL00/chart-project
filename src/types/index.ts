import { TooltipItem } from "chart.js";
import { CHART_X_AXES, CHART_Y_AXES } from "../constants";

export interface DistrictSeoulResponse {
    type: string;
    version: number;
    response: DistrictSeoulData;
}
export interface DistrictSeoulData {
    [key: string]: DistrictSeoulValue;
}
export interface DistrictSeoulValue {
    id: string;
    value_area: number;
    value_bar: number;
}
export interface ChartDatasetTypes {
    [CHART_X_AXES]: string;
    [CHART_Y_AXES]: DistrictSeoulValue;
}
export interface TooltipItemTypes extends TooltipItem<"bar" | "line"> {
    raw: ChartDatasetTypes;
}
