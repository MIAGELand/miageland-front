import { Employee } from '../models/models';
import axios from 'axios';
import { BASE_URL } from '../util/constants';

export async function getEmployee(email: String): Promise<Employee> {
    const response = await axios.get(`${BASE_URL}/api/employees/${email}`);
    return response.data;
}

export const employeeService = {
    getEmployee,
};