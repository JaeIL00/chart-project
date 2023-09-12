import { DistrictSeoulValue } from "../types";

const getChartFilterText = (dataValue: DistrictSeoulValue[]) => {
    const idArr = dataValue.map((data) => data.id);
    const freshDataValue = dataValue.filter(
        (data, idx) => idArr.indexOf(data.id) === idx
    );
    const filterTextArr = freshDataValue.map((data) => data.id);

    return filterTextArr;
};

export default getChartFilterText;
