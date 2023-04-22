export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: EmployeeRole;
}

export enum EmployeeRole {
    ADMIN = 'ADMIN',
    CLASSIC = 'CLASSIC',
}