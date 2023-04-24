export interface Employee {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: EmployeeRole;
}

export interface Ticket {
    nbTicket: number;
    date: Date;
    price: number;
    state: TicketState;
}

export interface FormData {
    name: string;
    route: string;
    data: {
        [key: string]: any;
    },
}

export enum TicketState {
    RESERVED = 'RESERVED',
    PAID = 'PAID',
    USED = 'USED',
    CANCELLED = 'CANCELLED',
}

export enum EmployeeRole {
    ADMIN = 'ADMIN',
    CLASSIC = 'CLASSIC',
}