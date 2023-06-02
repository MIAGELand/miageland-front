export interface Park {
  id: number;
  minTicketGauge: number;
  gauge: number;
  modifiedAt: Date;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: EmployeeRole;
}

export interface Ticket {
  id: number;
  date: Date;
  price: number;
  state: TicketState;
  nameVisitor: string;
  idVisitor: number;
}

export interface Attraction {
  id: number;
  name: string;
  opened: boolean;
}

export interface Visitor {
  id: number;
  name: string;
  surname: string;
  email: string;
  ticketList: Ticket[];
}

export interface VisitorSummary {
  id: number;
  name: string;
  surname: string;
  email: string;
  nbTicket: number;
}

export interface FormData {
  name: string;
  route: string;
  data: {
    [key: string]: any;
  };
}

export enum TicketState {
  RESERVED = "RESERVED",
  PAID = "PAID",
  USED = "USED",
  CANCELLED = "CANCELLED",
}

export enum EmployeeRole {
  ADMIN = "ADMIN",
  CLASSIC = "CLASSIC",
  MANAGER = "MANAGER",
}

export type size = "sm" | "md" | "lg";
