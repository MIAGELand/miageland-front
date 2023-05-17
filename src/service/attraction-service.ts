import { Attraction } from '../models/models';
import axios from 'axios';
import { BASE_URL } from '../util/constants';
import {getCookie} from "../util/cookie";

export async function getAllAttractions(): Promise<Attraction> {
    const email = getCookie('email');
    const response = await axios.get(`${BASE_URL}/attractions`, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}

export async function openAttraction(id: number): Promise<Attraction> {
    const email = getCookie('email');
    const response = await axios.patch(`${BASE_URL}/attractions/${id}`, {'opened': true}, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}

export async function closeAttraction(id: number): Promise<Attraction> {
    const email = getCookie('email');
    const response = await axios.patch(`${BASE_URL}/attractions/${id}`, {'opened': false}, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}

export async function removeAttraction(id: number): Promise<Attraction> {
    const email = getCookie('email');
    const response = await axios.delete(`${BASE_URL}/attractions/${id}`, { headers: {
            Authorization: `email=${email}`,
        }, } );
    return response.data;
}
export const attractionService = {
    getAllAttractions,
    openAttraction,
    closeAttraction,
    removeAttraction,
};
