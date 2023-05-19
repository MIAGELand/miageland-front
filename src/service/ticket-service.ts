import { Ticket } from '../models/models';
import axios from 'axios';
import { BASE_URL } from '../util/constants';
import {TicketStats} from "../models/stats";
import {getCookie} from "../util/cookie";
import {Ref} from "vue";

export async function getAllTickets(): Promise<Ticket[]> {
    const response = await axios.get(`${BASE_URL}/tickets/all`);
    return response.data;
}

export async function getTicketsByPage(page: Ref<number>): Promise<Ticket[]> {
    const response = await axios.get(`${BASE_URL}/tickets?page=${page.value}`);
    return response.data;
}

export async function validateTicket(id: number): Promise<Ticket> {
    const response = await axios.patch(`${BASE_URL}/tickets/${id}`, {'state': 'USED'});
    return response.data;
}

export async function cancelTicket(id: number): Promise<Ticket> {
    const response = await axios.patch(`${BASE_URL}/tickets/${id}`, {'state': 'CANCELLED'});
    return response.data;
}

export async function getTicketStats(): Promise<TicketStats> {
    const response = await axios.get(`${BASE_URL}/tickets/stats`);
    return response.data;
}

export async function deleteAllTickets(): Promise<void> {
    const email = getCookie('email');
    await axios.delete(`${BASE_URL}/tickets`, { headers: {
            Authorization: `email=${email}`,
        }
    });
}
export const ticketService = {
    getAllTickets,
    validateTicket,
    cancelTicket,
    getTicketStats,
    deleteAllTickets,
    getTicketsByPage
};
