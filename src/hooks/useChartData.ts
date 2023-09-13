import { useCallback, useEffect, useState } from 'react';

import { ChartDataCustom, DistrictSeoulResponse } from '../types';
import { getDistrictSeoulApi } from '../apis';
import { getSeperateResponse, getChartDataset, getChartFilterText, getFilteredChartStyle } from '../utils';

const useChartData = (chooseFilter: string[]) => {
  const [error, setError] = useState<string>('');
  const [filterTextList, setFilterTextList] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartDataCustom>({
    datasets: [],
  });

  const formatFetchResponse = (data: DistrictSeoulResponse) => {
    const { dataValue, axisXLabels } = getSeperateResponse(data);

    const filterTextArr = getChartFilterText(dataValue);
    setFilterTextList(filterTextArr);

    const datasets = getChartDataset(dataValue, axisXLabels);
    setChartData(datasets);
  };

  const initState = () => {
    setError('');
  };

  const fetch = useCallback(async () => {
    initState();
    await getDistrictSeoulApi()
      .then(({ data }) => formatFetchResponse(data))
      .catch((error) => setError(`${error.code}: 재시도 해주세요`));
  }, []);

  const filterChangeStyle = () => {
    const isExist = chartData.datasets.length > 0;
    if (!isExist) return;

    const { barBackgroundColor, areaBorderWidth } = getFilteredChartStyle(chooseFilter, chartData);
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
    error,
    refetch: fetch,
  };
};

export default useChartData;
