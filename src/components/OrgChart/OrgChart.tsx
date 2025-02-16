import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebaar/sidebar';
import { TreeStructure } from '../Tree/TreeStructure';
import { fetchEmployees, updateEmployee, deleteEmployee } from '../../api/employeeAPI';
import { checkForCircularReference } from '../../utils/heairarchy';
import { Employee } from '../../types';

export const OrgChart: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [draggedEmployee, setDraggedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [selectedTeam, setSelectedTeam] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEmployees();
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    getEmployees();
  }, []);

  const handleDragStart = (e: React.DragEvent, employee: Employee) => {
    setDraggedEmployee(employee);
  };

  const handleDrop = async (e: React.DragEvent, targetEmployee: Employee) => {
    e.preventDefault();
    if (!draggedEmployee || draggedEmployee.id === targetEmployee.id) return;

    if (checkForCircularReference(employees, draggedEmployee.id, targetEmployee.id)) {
      alert("This move would create a circular reference!");
      return;
    }

    const updatedEmployee = { ...draggedEmployee, managerId: targetEmployee.id };
    
    try {
      await updateEmployee(updatedEmployee);
      
      setEmployees(prevEmployees =>
        prevEmployees.map(emp =>
          emp.id === draggedEmployee.id
            ? updatedEmployee
            : emp
        )
      );
    } catch (err) {
      alert("Failed to update employee's manager");
      console.error(err);
    }
    
    setDraggedEmployee(null);
  };

  const handleDelete = async (employeeId: string) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees(prevEmployees =>
        prevEmployees.filter(emp => emp.id !== employeeId)
      );
    } catch (err) {
      alert("Failed to delete employee");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        employees={employees} 
        onDragStart={handleDragStart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      <TreeStructure
        employees={employees}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        onDelete={handleDelete}
      />
    </div>
  );
};
