import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/vue-query';
import {getTicketListByVisitor, getVisitor} from '../service/visitor-service';
import {Ref} from "vue";

export const visitorKeys = createQueryKeys('Visitor', {
    getVisitor: (name: Ref<string>, surname: Ref<string>) => ({
        queryKey: ['name', name, 'surname', surname],
        queryFn: () => getVisitor(name, surname),
    }),
    getTicketListByVisitor: (id: number) => ({
        queryKey: ['id', id],
        queryFn: () => getTicketListByVisitor(id),
    }),
});

export function useVisitor(name: Ref<string>, surname: Ref<string>) {
    return useQuery({...visitorKeys.getVisitor(name, surname)});
}

export function useTicketListByVisitor(id: number) {
    return useQuery({...visitorKeys.getTicketListByVisitor(id)});
}
