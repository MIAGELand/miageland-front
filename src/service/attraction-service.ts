import { Attraction } from '../models/models';
import axios from 'axios';
import { BASE_URL } from '../util/constants';

export async function getAllAttractions(): Promise<Attraction> {
    const response = await axios.get(`${BASE_URL}/attractions`);
    return response.data;
}

export async function openAttraction(id: number): Promise<Attraction> {
    const response = await axios.patch(`${BASE_URL}/attractions/${id}`, {'opened': true});
    return response.data;
}

export async function closeAttraction(id: number): Promise<Attraction> {
    const response = await axios.patch(`${BASE_URL}/attractions/${id}`, {'opened': false});
    return response.data;
}

export async function removeAttraction(id: number): Promise<Attraction> {
    const response = await axios.delete(`${BASE_URL}/attractions/${id}`);
    return response.data;
}
export const attractionService = {
    getAllAttractions,
    openAttraction,
    closeAttraction,
    removeAttraction,
};
