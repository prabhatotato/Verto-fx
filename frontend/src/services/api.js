import axios from "axios";

const API_URL = "http://localhost:3000/api/employees";

export const getEmployees = async () => {
  return axios.get(API_URL);
};

export const createEmployee = async (employee) => {
  return axios.post(API_URL, employee);
};

export const updateEmployee = async (id, employee) => {
  return axios.put(`${API_URL}/${id}`, employee);
};

export const deleteEmployee = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
