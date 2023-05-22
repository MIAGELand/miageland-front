import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/vue-query";
import { getTicketListByVisitor, getVisitor } from "../service/visitor-service";
import { Ref } from "vue";

export const visitorKeys = createQueryKeys("Visitor", {
  getVisitor: (email: Ref<string>) => ({
    queryKey: ["email", email],
    queryFn: () => getVisitor(email),
  }),
  getTicketListByVisitor: (id: number) => ({
    queryKey: ["id", id],
    queryFn: () => getTicketListByVisitor(id),
  }),
});

export function useVisitor(email: Ref<string>) {
  return useQuery({ ...visitorKeys.getVisitor(email) });
}

export function useTicketListByVisitor(id: number) {
  return useQuery({ ...visitorKeys.getTicketListByVisitor(id) });
}
