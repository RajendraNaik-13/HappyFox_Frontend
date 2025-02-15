// api/employeeApi.ts
import { Employee } from '../types';

const API_URL = '/api/employees';

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  try {
    const response = await fetch(`${API_URL}/${employee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.employee;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};