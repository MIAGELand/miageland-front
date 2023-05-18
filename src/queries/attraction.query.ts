import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/vue-query';
import {getAllAttractions, getAttractionStats} from "../service/attraction-service";

export const attractionsKeys = createQueryKeys('Attraction', {
    attractionList: {
        queryKey: null,
        queryFn: () => getAllAttractions(),
    },
    attractionStats: {
        queryKey: null,
        queryFn: () => getAttractionStats(),
    }
});

export function useAttractionList() {
    return useQuery(attractionsKeys.attractionList);
}

export function useAttractionStats() {
    return useQuery(attractionsKeys.attractionStats);
}
