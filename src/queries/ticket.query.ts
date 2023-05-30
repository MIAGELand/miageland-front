import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/vue-query";
import {
  getAllTickets,
  getTicketsByPage,
  getTicketStats,
  getTicketStatsByRange,
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
  ticketStatsByDateRange: (startDate: Ref<string>, endDate: Ref<string>) => ({
    queryKey: ["startDate", startDate, "endDate", endDate],
    queryFn: () => getTicketStatsByRange(startDate, endDate),
  }),
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

export function useTicketStatsByDateRange(
  startDate: Ref<string>,
  endDate: Ref<string>
) {
  return useQuery({
    ...ticketKeys.ticketStatsByDateRange(startDate, endDate),
  });
}
