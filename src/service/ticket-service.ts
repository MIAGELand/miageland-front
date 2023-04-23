import { Ticket } from '../models/models';
import axios from 'axios';
import { BASE_URL } from '../util/constants';

export async function getAllTickets(): Promise<Ticket[]> {
    const response = await axios.get(`${BASE_URL}/tickets`);
    return response.data;
}

export const ticketService = {
    getAllTickets,
};
