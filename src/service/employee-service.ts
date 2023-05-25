import { Employee } from "../models/models";
import { deleteCookie, getCookie } from "../util/cookie";
import { EmployeeStats } from "../models/stats";
import { api } from "../main";

export async function getEmployee(email: String): Promise<Employee> {
  return api.get(`/employees/${email}`).then((response) => {
    document.cookie = "email=" + response.data.email + ";";
    document.cookie = "role=" + response.data.role + ";";
    deleteCookie("id");
    deleteCookie("name");
    deleteCookie("surname");
    return response.data;
  });
}

export async function getAllEmployees(): Promise<Employee[]> {
  const email = getCookie("email");
  const response = await api.get(`/employees`, {
    headers: {
        Authorization: `email=${email}`,
    }
  });
  return response.data;
}

export async function removeEmployee(id: number): Promise<void> {
  const email = getCookie("email");
  const response = await api.delete(`/employees/${id}`, {
    headers: {
      Authorization: `email=${email}`,
    },
  });
  return response.data;
}

export async function upgradeEmployee(id: number): Promise<void> {
  const email = getCookie("email");
  const response = await api.patch(
    `/employees/${id}`,
    { role: "ADMIN" },
    {
      headers: {
        Authorization: `email=${email}`,
      },
    }
  );
  return response.data;
}

export async function downgradeEmployee(id: number): Promise<void> {
  const email = getCookie("email");
  const response = await api.patch(
    `/employees/${id}`,
    { role: "CLASSIC" },
    {
      headers: {
        Authorization: `email=${email}`,
      },
    }
  );
  return response.data;
}

export async function getEmployeeStats(): Promise<EmployeeStats> {
  const email = getCookie("email");
  const response = await api.get(`/employees/stats`, {
    headers: {
        Authorization: `email=${email}`,
    }
  });
  return response.data;
}
export const employeeService = {
  getEmployee,
  getAllEmployees,
  removeEmployee,
  upgradeEmployee,
  downgradeEmployee,
  getEmployeeStats,
};
