import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/vue-query';
import {getAllTickets, getTicketStats} from '../service/ticket-service';
export const ticketKeys = createQueryKeys('Ticket', {
    ticketList: {
        queryKey: null,
        queryFn: () => getAllTickets(),
    },
    ticketStats: {
        queryKey: null,
        queryFn: () => getTicketStats(),
    }
});

export function useTicketList() {
    return useQuery(ticketKeys.ticketList);
}

export function useTicketStats() {
    return useQuery(ticketKeys.ticketStats);
}
