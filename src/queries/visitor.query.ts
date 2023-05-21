import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/vue-query';
import { getVisitor } from '../service/visitor-service';
import {Ref} from "vue";

export const visitorKeys = createQueryKeys('Visitor', {
    getVisitor: (name: Ref<string>, surname: Ref<string>) => ({
        queryKey: ['name', name, 'surname', surname],
        queryFn: () => getVisitor(name, surname),
    }),
});

export function useVisitor(name: Ref<string>, surname: Ref<string>) {
    return useQuery({...visitorKeys.getVisitor(name, surname)});
}
