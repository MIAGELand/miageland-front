import axios from 'axios';
import { BASE_URL } from '../util/constants';
import {Park} from "../models/models";

export async function getParkInfo(): Promise<Park> {
    const response = await axios.get(`${BASE_URL}/park`);
    return response.data;
}
export async function setGauge(gauge: number): Promise<Park> {
    const response = await axios.patch(`${BASE_URL}/park/gauge`, {"gauge": gauge});
    return response.data;
}

export const parkService = {
    getParkInfo,
    setGauge
};
