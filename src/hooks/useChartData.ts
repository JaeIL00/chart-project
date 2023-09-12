import { useEffect, useState } from "react";
import { ChartData } from "chart.js";

import { ChartDatasetTypes, DistrictSeoulResponse } from "../types";
import { getDistrictSeoulApi } from "../apis/districtSeoul";
import {
    getSeperateResponse,
    getChartDataset,
    getChartFilterText,
    getFilteredChartStyle,
} from "../utils";

const useChartData = (chooseFilter: string[]) => {
    const [filterTextList, setFilterTextList] = useState<string[]>([]);
    const [chartData, setChartData] = useState<
        ChartData<"bar" | "line", ChartDatasetTypes[]>
    >({ datasets: [] });

    const formatFetchResponse = (data: DistrictSeoulResponse) => {
        const { dataValue, axisXLabels } = getSeperateResponse(data);

        const filterTextArr = getChartFilterText(dataValue);
        setFilterTextList(filterTextArr);

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

    const filterChangeStyle = () => {
        const isExist = chartData.datasets.length > 0;
        if (!isExist) return;

        const { barBackgroundColor, areaBorderWidth } = getFilteredChartStyle(
            chooseFilter,
            chartData
        );
        setChartData((prev) => {
            const [barDataset, areaDataset] = prev.datasets;
            return {
                datasets: [
                    {
                        ...barDataset,
                        backgroundColor: barBackgroundColor,
                    },
                    {
                        ...areaDataset,
                        pointBackgroundColor: areaBorderWidth,
                    },
                ],
            };
        });
    };

    useEffect(() => {
        filterChangeStyle();
    }, [chooseFilter]);

    useEffect(() => {
        fetch();
    }, []);

    return {
        chartData,
        filterTextList,
    };
};

export default useChartData;
