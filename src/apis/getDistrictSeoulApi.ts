import axios from "axios";
import { GET_SEOUL_END_POINT } from "../constants";
import { DistrictSeoulResponse } from "../types";

const getDistrictSeoulApi = async () => {
    return await axios.get<DistrictSeoulResponse>(GET_SEOUL_END_POINT);
};

export default getDistrictSeoulApi;
