import { Attraction } from '../models/models';
import axios from 'axios';
import { BASE_URL } from '../util/constants';

export async function getAllAttractions(): Promise<Attraction> {
    const response = await axios.get(`${BASE_URL}/attractions`);
    return response.data;
}
export const attractionService = {
    getAllAttractions,
};
