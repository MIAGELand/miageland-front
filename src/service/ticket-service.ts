import { Ticket } from "../models/models";
import { TicketStats } from "../models/stats";
import { getCookie } from "../util/cookie";
import { Ref } from "vue";
import { api } from "../main";

export async function getAllTickets(): Promise<Ticket[]> {
  const email = getCookie("email");
  const response = await api.get(`/tickets/all`, {
    headers: {
      Authorization: `email=${email}`,
    },
  });
  return response.data;
}

export async function getTicketsByPage(page: Ref<number>): Promise<Ticket[]> {
  const email = getCookie("email");
  const response = await api.get(`/tickets?page=${page.value}`, {
    headers: {
      Authorization: `email=${email}`,
    },
  });
  return response.data;
}

export async function payTicket(id: number): Promise<Ticket> {
  const response = await api.patch(`/tickets/${id}`, { state: "PAID" });
  return response.data;
}

export async function validateTicket(id: number): Promise<Ticket> {
  const email = getCookie("email");
  const response = await api.patch(
    `/tickets/${id}`,
    { state: "USED" },
    {
      headers: {
        Authorization: `email=${email}`,
      },
    }
  );
  return response.data;
}

export async function cancelTicket(id: number): Promise<Ticket> {
  const response = await api.patch(`/tickets/${id}`, { state: "CANCELLED" });
  return response.data;
}

export async function getTicketStats(): Promise<TicketStats> {
  const email = getCookie("email");
  const response = await api.get(`/tickets/stats`, {
    headers: {
      Authorization: `email=${email}`,
    },
  });
  return response.data;
}

export async function getTicketStatsByRange(
  start: Ref<string>,
  end: Ref<string>
): Promise<TicketStats> {
  const email = getCookie("email");
  const response = await api.get(
    `/tickets/stats?start=${start.value}&end=${end.value}`,
    {
      headers: {
        Authorization: `email=${email}`,
      },
    }
  );
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
