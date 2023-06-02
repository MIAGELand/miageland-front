import {Ticket, Visitor, VisitorSummary} from "../models/models";
import { api } from "../main";
import { Ref } from "vue";
import { deleteCookie, getCookie } from "../util/cookie";
import { TicketStats, VisitorStats } from "../models/stats";

export async function getVisitor(email: Ref<string>): Promise<Visitor> {
  return api.get(`/visitors/${email.value}`).then((response) => {
    document.cookie = "name=" + response.data.name + ";";
    document.cookie = "surname=" + response.data.surname + ";";
    document.cookie = "id=" + response.data.id + ";";
    document.cookie = "email=" + response.data.email + ";";
    deleteCookie("role");
    return response.data;
  });
}

export async function getTicketListByVisitor(id: number): Promise<Ticket[]> {
  const response = await api.get(`/visitors/${id}/tickets`);
  return response.data;
}
export async function deleteVisitor(id: number): Promise<Visitor> {
  const response = await api.delete(`/visitors/${id}`);
  return response.data;
}

export async function getVisitorStats(): Promise<VisitorStats> {
  const email = getCookie("email");
  const response = await api.get(`/visitors/stats`, {
    headers: {
      Authorization: `email=${email}`,
    },
  });
  return response.data;
}

export async function getVisitorsByPage(page: Ref<number>): Promise<VisitorSummary[]> {
  const email = getCookie("email");
  const response = await api.get(`/visitors?page=${page.value}`, {
    headers: {
      Authorization: `email=${email}`,
    },
  });
  return response.data;
}
export const visitorService = {
  getVisitor,
  getTicketListByVisitor,
  deleteVisitor,
  getVisitorsByPage,
};
