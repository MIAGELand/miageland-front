import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/vue-query';
import { getAllTickets } from '../service/ticket-service';
export const ticketKeys = createQueryKeys('Ticket', {
    ticketList: {
        queryKey: null,
        queryFn: () => getAllTickets(),
    },
});

export function useTicketList() {
    return useQuery(ticketKeys.ticketList);
}
