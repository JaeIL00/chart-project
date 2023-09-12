import { useEffect, useState } from "react";
import { ChartData } from "chart.js";

import { ChartDatasetTypes, DistrictSeoulResponse } from "../types";
import { getDistrictSeoulApi } from "../apis/districtSeoul";
import { getSeperateResponse, getChartDataset } from "../utils";

const useChartData = () => {
    const [chartData, setChartData] =
        useState<ChartData<"bar" | "line", ChartDatasetTypes[]>>();

    const formatFetchResponse = (data: DistrictSeoulResponse) => {
        const { dataValue, axisXLabels } = getSeperateResponse(data);
        const datasets = getChartDataset(dataValue, axisXLabels);
        setChartData({
            datasets,
        });
    };

    const fetch = async () => {
        await getDistrictSeoulApi().then(({ data }) =>
            formatFetchResponse(data)
        );
    };

    useEffect(() => {
        fetch();
    }, []);

    return {
        chartData,
    };
};

export default useChartData;
