# Chart-Project
<img width="800" alt="스크린샷 2023-09-13 오후 6 46 26" src="https://github.com/JaeIL00/chart-project/assets/101620064/af1309de-0c27-407e-a2e1-cc7249c68be6">

원티드 프리온보딩 인턴십 4주차 개인 과제 레포지토리입니다.

## 개요

진행 기간 : 2023.09.11 ~ 2023.09.12

주어진 데이터를 기반으로 시계열 차트 만들기

## 배포


배포 링크: [https://candid-gumdrop-4c0555.netlify.app/](https://candid-gumdrop-4c0555.netlify.app/)

## 실행 방법

1. Repository Clone

```
$ git clone https://github.com/JaeIL00/chart-project.git
```

3. 의존성 패키지 설치

```
npm install
```

4. 개발 서버 실행

```
npm run dev
```

## 요구 사항

#### 1. 시계열 차트 만들기

```
-   주어진 JSON 데이터의 key값(시간)을 기반으로 시계열 차트 구현
-   하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 구현
-   Area 그래프의 기준값은 value_area 값을 이용
-   Bar 그래프의 기준값은 value_bar 값을 이용
-   차트의 Y축에 대략적인 수 표현
```

#### 2. 호버 기능 구현

```
-   특정 데이터 구역에 마우스 호버시 id, value_area, value_bar 데이터를 툴팁 형태로 제공
```

#### 3. 필터링 기능 구현

```
-   필터링은 특정 데이터 구역을 하이라이트 하는 방식으로 구현
-   필터링 기능은 버튼 형태로 ID값(지역이름)을 활용
-   필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리
-   특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트
```

## 구현 기능

#### 1. [useChartData](https://github.com/JaeIL00/chart-project/blob/main/src/hooks/useChartData.ts) 커스텀훅

-   서버로 차트 데이터 요청 및 응답 데이터 라이브러리가 요구하는 데이터셋 포맷으로 포맷팅

-   차트 x축 라벨 데이터 추출 및 읽기 편한 포맷으로 포맷팅
-   필터 카테고리 이름 데이터 추출
-   차트 필터링 시 차트 데이터셋 차트 스타일 수정
-   서버 상태 중 Error Message를 UI 컴포넌트로 전달 (Loading 상태는 현재 상황에서 UX를 해치기 때문에 미구현)

#### 2. 시계열 차트 구현

-   [getFormatDateString](https://github.com/JaeIL00/chart-project/blob/main/src/utils/getFormatDateString.ts)에서 날짜와 시간 포맷팅 후 그래프 x축 라벨링
    ```ts
    `${year}년 ${month}월 ${day}일 ${hour}:${min}:${sec}`;
    ```
-   [getChartDataset](https://github.com/JaeIL00/chart-project/blob/main/src/utils/getChartDataset.ts)에서 데이터셋에 `bar` 타입과 `line` 타입 데이터 구현하여 복합 그래프 구현

-   data parsing 옵션을 사용하여 `bar`, `area` 그래프에서 각기 다른 데이터 표현
    ```ts
    // bar
    parsing: {
      xAxisKey: CHART_X_AXES,
      yAxisKey: `${CHART_Y_AXES}.${CHART_LABElS.BAR}`,
    },
    
    // area
    parsing: {
      xAxisKey: CHART_X_AXES,
      yAxisKey: `${CHART_Y_AXES}.${CHART_LABElS.AREA}`,
    },
    ```
-   차트 `scale` 옵션 활용해 `bar`, `area` 그래프 y축 값 설정

#### 3. 호버 기능 구현

-   차트 데이터셋에 hover 속성 활용
-   `Tooltip` 플러그인 활용해 콜백 함수에서 `id` 데이터 리턴
    ```ts
    tooltip: {
      callbacks: {
        beforeBody: (tooltipItem: TooltipItemTypes[]) => {
          return `id: ${tooltipItem[0].raw.y.id}`;
        },
      },
    },
    ```

#### 4. 필터링 기능

-   [getChartFilterText](https://github.com/JaeIL00/chart-project/blob/main/src/utils/getChartFilterText.ts)에서 `filter` 메서드를 활용해 중복 없는 카테고리 문구 추출

-   [getFilteredChartStyle](https://github.com/JaeIL00/chart-project/blob/main/src/utils/getFilteredChartStyle.ts)에서 `chooseFilter`에 있는 현재 필터와 차트 데이터를 비교하여 일치, 불일치 조건으로 각 스타일 값을 넣은 배열 생성, 데이터셋에 해당 스타일 넣어 특정 그래프 하이라이트 구현
-   chart.js에서 제공하는 컴포넌트 속성 `onClick` 활용해 데이터가 존재하는 그래프 요소 클릭 시 `chooseFilter` 상태 업데이트 및 상태 변화 감지하여 `getFilteredChartStyle` 함수 실행
     ```ts
     const getIdClickChart = (clickElement: InteractionItem[]) => {
        if (clickElement.length === 0) return;
        const { datasetIndex, index } = clickElement[0];
        const id = chartData.datasets[datasetIndex].data[index].y.id;
        updateChooseFilter(id, FILTER_TYPE_CHART);
    };

    const clickChart = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!chartRef.current) return;
        const clickElement = getElementsAtEvent(chartRef.current, event);
        getIdClickChart(clickElement);
    };
     ```
-   `string[]` 타입인 `chooseFilter` 활용하여 필터링 중복 선택 및 초기화 구현
-   차트 클릭 시 중복 필터 불가, 필터 버튼 클릭 시 중복 필터 가능
    ```js
    const findIdx = chooseFilter.findIndex((filterText) => filterText === text);
    if (findIdx === FIND_FAIL) {
        setChooseFilter((prev) => {
            return type === "btn" ? [...prev, text] : [text];
        });
    } else {
        prevChooseFilterHandler(findIdx, text, type);
    }
    ```

## 기술 스택

-   언어: TypeScript
-   빌드: Vite
-   라이브러리

    -   react
    -   react-router-dom
    -   chart.js
    -   react-chartjs-2
    -   axios
    -   react-icons
    -   sass

-   Chart.js 선택한 이유

    -   GitHub Star 약 6만, 주간 약 240만 npm 다운로드 수로 높은 점유율을 가짐

    -   공식 문서 잘 되있어 러닝커브가 짧음
    -   커뮤니티와 많은 레퍼런스로 개발 중 문제 해결이 빠르게 가능함
    -   Canvas 렌더링은 SVG 렌더링과 비교하여 DOM 트리 비용을 줄임

## 폴더 구조

```markdown
public
├──mock
│ └── data.json
src
├── api
├── components
│ ├── common
│ └── domain
├── constants
├── hooks
├── pages
├── routes
├── styles
├── types
└── utils
```
