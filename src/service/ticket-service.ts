import { Ticket } from "../models/models";
import { TicketStats } from "../models/stats";
import { getCookie } from "../util/cookie";
import { Ref } from "vue";
import { api } from "../main";

export async function getAllTickets(): Promise<Ticket[]> {
  const response = await api.get(`/tickets/all`);
  return response.data;
}

export async function getTicketsByPage(page: Ref<number>): Promise<Ticket[]> {
  const response = await api.get(`/tickets?page=${page.value}`);
  return response.data;
}

export async function payTicket(id: number): Promise<Ticket> {
  const response = await api.patch(`/tickets/${id}`, { state: "PAID" });
  return response.data;
}

export async function validateTicket(id: number): Promise<Ticket> {
  const response = await api.patch(`/tickets/${id}`, { state: "USED" });
  return response.data;
}

export async function cancelTicket(id: number): Promise<Ticket> {
  const response = await api.patch(`/tickets/${id}`, { state: "CANCELLED" });
  return response.data;
}

export async function getTicketStats(): Promise<TicketStats> {
  const response = await api.get(`/tickets/stats`);
  return response.data;
}

export async function deleteAllTickets(): Promise<void> {
  const email = getCookie("email");
  await api.delete(`/tickets`, {
    headers: {
      Authorization: `email=${email}`,
    },
  });
}
export const ticketService = {
  getAllTickets,
  payTicket,
  validateTicket,
  cancelTicket,
  getTicketStats,
  deleteAllTickets,
  getTicketsByPage,
};
