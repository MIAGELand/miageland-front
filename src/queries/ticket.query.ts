import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/vue-query";
import {
  getAllTickets,
  getTicketsByPage,
  getTicketStats,
} from "../service/ticket-service";
import { Ref } from "vue";
export const ticketKeys = createQueryKeys("Ticket", {
  ticketList: {
    queryKey: null,
    queryFn: () => getAllTickets(),
  },
  ticketListByPage: (page: Ref<number>) => ({
    queryKey: ["page", page],
    queryFn: () => getTicketsByPage(page),
  }),
  ticketStats: {
    queryKey: null,
    queryFn: () => getTicketStats(),
  },
});

export function useTicketList() {
  return useQuery(ticketKeys.ticketList);
}

export function useTicketStats() {
  return useQuery(ticketKeys.ticketStats);
}

export function useTicketListByPage(page: Ref<number>) {
  return useQuery({
    ...ticketKeys.ticketListByPage(page),
  });
}
