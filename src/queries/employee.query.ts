import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/vue-query';
import { getAllEmployees } from '../service/employee-service';

export const employeesKeys = createQueryKeys('Employee', {
    employeeList: {
        queryKey: null,
        queryFn: () => getAllEmployees(),
    },
});

export function useEmployeeList() {
    return useQuery(employeesKeys.employeeList);
}
