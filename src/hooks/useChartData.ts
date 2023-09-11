import { useEffect, useState } from "react";
import { getDistrictSeoulApi } from "../apis/districtSeoul";
import { DistrictSeoulResponse } from "../types";
import getSeperateResponse from "../utils/getSeperateResponse";
import getChartDataset from "../utils/getChartDataset";
import { ChartData } from "chart.js";

const useChartData = () => {
    const [chartData, setChartData] = useState<ChartData<"bar">>();

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
