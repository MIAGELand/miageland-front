import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/vue-query";
import { getParkInfo } from "../service/park-service";

export const parkKeys = createQueryKeys("Park", {
  getParkInfo: {
    queryKey: null,
    queryFn: () => getParkInfo(),
  },
});

export function useParkInfo() {
  return useQuery(parkKeys.getParkInfo);
}
