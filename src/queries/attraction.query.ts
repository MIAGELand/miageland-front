import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/vue-query';
import {getAllAttractions} from "../service/attraction-service";

export const attractionsKeys = createQueryKeys('Attraction', {
    attractionList: {
        queryKey: null,
        queryFn: () => getAllAttractions(),
    },
});

export function useAttractionList() {
    return useQuery(attractionsKeys.attractionList);
}
