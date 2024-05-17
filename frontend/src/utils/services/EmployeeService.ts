import Employee from "@/Types/Employee/Employee";
import axiosInstance from "../middleware/axios/axios";
import { Key } from "react";

const API_URL = "/api/employees";

export const getEmployees = async () => {
  try {
    const response = await axiosInstance.get<Employee[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funcionários", error);
    throw error;
  }
};

export const getEmployeeById = async (id: string | string[]) => {
  try {
    const response = await axiosInstance.get<Employee>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar funcionário com ID: ${id}`, error);
    throw error;
  }
};

export const createEmployee = async (employee: Employee) => {
  try {
    const response = await axiosInstance.post<Employee>(API_URL, employee);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar funcionário", error);
    throw error;
  }
};

export const updateEmployee = async (id: string | string[], employee: Employee) => {
  try {
    const response = await axiosInstance.put<Employee>(`${API_URL}/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar funcionário com ID: ${id}`, error);
    throw error;
  }
};

export const deleteEmployee = async (id: Key) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar funcionário com ID: ${id}`, error);
    throw error;
  }
};
