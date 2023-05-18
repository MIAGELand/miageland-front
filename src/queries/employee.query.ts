import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/vue-query';
import {getAllEmployees, getEmployeeStats} from '../service/employee-service';

export const employeesKeys = createQueryKeys('Employee', {
    employeeList: {
        queryKey: null,
        queryFn: () => getAllEmployees(),
    },
    employeeStats: {
        queryKey: null,
        queryFn: () => getEmployeeStats(),
    }
});

export function useEmployeeList() {
    return useQuery(employeesKeys.employeeList);
}

export function useEmployeeStats() {
    return useQuery(employeesKeys.employeeStats);
}
