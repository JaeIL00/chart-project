import { DistrictSeoulResponse } from "../types";
import getFormatDateString from "./getFormatDateString";

const getSeperateResponse = (data: DistrictSeoulResponse) => {
    const dateArr = Object.keys(data.response);
    const dataValue = Object.values(data.response);

    const axisXLabels = dateArr.map((item) => {
        const date = new Date(item);
        return getFormatDateString(date);
    });

    return {
        dataValue,
        axisXLabels,
    };
};

export default getSeperateResponse;
