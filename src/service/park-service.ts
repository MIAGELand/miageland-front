import {Park} from "../models/models";
import {api} from "../main";

export async function getParkInfo(): Promise<Park> {
    const response = await api.get(`/park`);
    return response.data;
}
export async function setGauge(gauge: number): Promise<Park> {
    const response = await api.patch(`/park/gauge`, {"gauge": gauge});
    return response.data;
}

export const parkService = {
    getParkInfo,
    setGauge
};
