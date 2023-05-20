import {Park} from "../models/models";
import {api} from "../main";
import {getCookie} from "../util/cookie";

export async function getParkInfo(): Promise<Park> {
    const response = await api.get(`/park`);
    return response.data;
}
export async function setGauge(gauge: number): Promise<Park> {
    const email = getCookie('email');
    const response = await api.patch(`/park/gauge`, {"gauge": gauge}, {
        headers: {
            Authorization: `email=${email}`,
        }
    });
    return response.data;
}

export const parkService = {
    getParkInfo,
    setGauge
};
