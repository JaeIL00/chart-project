import { useEffect, useState } from "react";
import { ChartData } from "chart.js";

import { DistrictSeoulResponse } from "../types";
import { getDistrictSeoulApi } from "../apis/districtSeoul";
import { getSeperateResponse, getChartDataset } from "../utils";

const useChartData = () => {
    const [chartData, setChartData] = useState<ChartData<"bar" | "line">>();

    const formatFetchResponse = (data: DistrictSeoulResponse) => {
        const { dataValue, axisXLabels } = getSeperateResponse(data);
        const datasets = getChartDataset(dataValue);
        setChartData({
            labels: axisXLabels,
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
