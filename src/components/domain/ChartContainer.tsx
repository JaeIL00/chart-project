import { MouseEvent, useEffect, useState } from 'react';

import { ChartFilter, PaintChart } from '.';
import { RefreshButton } from '../common';
import { useChartData } from '../../hooks';
import { FILTER_TYPE_BTN, FIND_FAIL } from '../../constants';

import '../../styles/chartContainerStyle.scss';

const ChartContainer = () => {
  const [chooseFilter, setChooseFilter] = useState<string[]>([]);

  const { chartData, filterTextList, error, refetch } = useChartData(chooseFilter);

  const resetFilter = () => setChooseFilter([]);

  const refreshChart = () => {
    resetFilter();
    refetch();
  };

  const prevChooseFilterHandler = (findIdx: number, text: string, type: string) => {
    const freshChooseFilter = chooseFilter.filter((_, idx) => idx !== findIdx);
    const chartClickInitState = chooseFilter.length > 1 ? [text] : [];
    const typeConditionalState = type === 'btn' ? freshChooseFilter : chartClickInitState;
    setChooseFilter(typeConditionalState);
  };

  const updateChooseFilter = (text: string, type: 'btn' | 'chart') => {
    const findIdx = chooseFilter.findIndex((filterText) => filterText === text);
    if (findIdx === FIND_FAIL) {
      setChooseFilter((prev) => {
        return type === 'btn' ? [...prev, text] : [text];
      });
    } else {
      prevChooseFilterHandler(findIdx, text, type);
    }
  };

  const clickFilterBtn = (event: MouseEvent<HTMLButtonElement>) => {
    const text = event.currentTarget.textContent;
    if (!text) return;
    updateChooseFilter(text, FILTER_TYPE_BTN);
  };

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <>
      <header>
        <h1>시계열 차트</h1>
        <RefreshButton onClick={refreshChart} />
      </header>
      {chartData.datasets.length > 0 && (
        <main>
          <PaintChart chartData={chartData} updateChooseFilter={updateChooseFilter} />
          <ChartFilter
            filterTextList={filterTextList}
            chooseFilter={chooseFilter}
            clickFilterBtn={clickFilterBtn}
            resetFilter={resetFilter}
          />
        </main>
      )}
    </>
  );
};

export default ChartContainer;
