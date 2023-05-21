import { Attraction } from '../models/models';
import {getCookie} from "../util/cookie";
import {AttractionStats} from "../models/stats";
import {api} from "../main";

export async function getAllAttractions(): Promise<Attraction[]> {
    const email = getCookie('email');
    const response = await api.get(`/attractions`, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}

export async function openAttraction(id: number): Promise<Attraction> {
    const email = getCookie('email');
    const response = await api.patch(`/attractions/${id}`, {'opened': true}, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}

export async function closeAttraction(id: number): Promise<Attraction> {
    const email = getCookie('email');
    const response = await api.patch(`/attractions/${id}`, {'opened': false}, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}

export async function removeAttraction(id: number): Promise<Attraction> {
    const email = getCookie('email');
    const response = await api.delete(`/attractions/${id}`, { headers: {
            Authorization: `email=${email}`,
        }, } );
    return response.data;
}

export async function getAttractionStats(): Promise<AttractionStats> {
    const email = getCookie('email');
    const response = await api.get(`/attractions/stats`, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}
export const attractionService = {
    getAllAttractions,
    openAttraction,
    closeAttraction,
    removeAttraction,
    getAttractionStats,
};
