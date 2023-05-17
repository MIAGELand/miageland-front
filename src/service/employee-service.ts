import { Employee } from '../models/models';
import axios from 'axios';
import { BASE_URL } from '../util/constants';
import {getCookie} from "../util/cookie";

export async function getEmployee(email: String): Promise<Employee> {
    const response = await axios.get(`${BASE_URL}/employees/${email}`);
    return response.data;
}

export async function getAllEmployees(): Promise<Employee[]> {
    const response = await axios.get(`${BASE_URL}/employees`);
    return response.data;
}

export async function removeEmployee(id: number): Promise<void> {
    const email = getCookie('email');

    const response = await axios.delete(`${BASE_URL}/employees/${id}`, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}

export async function upgradeEmployee(id: number): Promise<void> {
    const email = getCookie('email');

    const response = await axios.patch(`${BASE_URL}/employees/${id}`, {'role': 'ADMIN'}, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}

export async function downgradeEmployee(id: number): Promise<void> {
    const email = getCookie('email');

    const response = await axios.patch(`${BASE_URL}/employees/${id}`, {'role': 'CLASSIC'}, { headers: {
            Authorization: `email=${email}`,
        }, });
    return response.data;
}
export const employeeService = {
    getEmployee,
    getAllEmployees,
    removeEmployee,
    upgradeEmployee,
    downgradeEmployee,
};
