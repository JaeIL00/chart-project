export interface DistrictSeoulResponse {
    type: string;
    version: number;
    response: DistrictSeoulData[];
}
export interface DistrictSeoulData {
    id: string;
    value_area: number;
    value_bar: number;
}
