import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/vue-query";
import {getTicketListByVisitor, getVisitor, getVisitorsByPage, getVisitorStats} from "../service/visitor-service";
import { Ref } from "vue";
import {getTicketsByPage} from "../service/ticket-service";

export const visitorKeys = createQueryKeys("Visitor", {
  getVisitor: (email: Ref<string>) => ({
    queryKey: ["email", email],
    queryFn: () => getVisitor(email),
  }),
  getTicketListByVisitor: (id: number) => ({
    queryKey: ["id", id],
    queryFn: () => getTicketListByVisitor(id),
  }),
  visitorStats: {
    queryKey: null,
    queryFn: () => getVisitorStats(),
  },
  visitorListByPage: (page: Ref<number>) => ({
    queryKey: ["page", page],
    queryFn: () => getVisitorsByPage(page),
  }),
});

export function useVisitor(email: Ref<string>) {
  return useQuery({ ...visitorKeys.getVisitor(email) });
}

export function useTicketListByVisitor(id: number) {
  return useQuery({ ...visitorKeys.getTicketListByVisitor(id) });
}

export function useVisitorListByPage(page: Ref<number>) {
  return useQuery({
    ...visitorKeys.visitorListByPage(page),
  });
}

export function useVisitorStats() {
  return useQuery(visitorKeys.visitorStats);
}
