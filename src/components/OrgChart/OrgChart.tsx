import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebaar/sidebar';
import { TreeStructure } from '../Tree/TreeStructure';
import { fetchEmployees } from '../../api/employeeAPI';
import { checkForCircularReference } from '../../utils/heairarchy';
import { Employee } from '../../types';

export const OrgChart: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [draggedEmployee, setDraggedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees().then(setEmployees);
  }, []);

  const handleDragStart = (e: React.DragEvent, employee: Employee) => {
    setDraggedEmployee(employee);
  };

  const handleDrop = (e: React.DragEvent, targetEmployee: Employee) => {
    e.preventDefault();
    if (!draggedEmployee || draggedEmployee.id === targetEmployee.id) return;

    if (checkForCircularReference(employees, draggedEmployee.id, targetEmployee.id)) {
      alert("This move would create a circular reference!");
      return;
    }

    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === draggedEmployee.id
          ? { ...emp, managerId: targetEmployee.id }
          : emp
      )
    );
    setDraggedEmployee(null);
  };

  const handleDelete = (employeeId: number) => {
    setEmployees(prevEmployees =>
      prevEmployees.filter(emp => emp.id !== employeeId)
    );
  };

  return (
    <div className="flex h-screen flex-row">
      <Sidebar 
        employees={employees} 
        onDragStart={handleDragStart}
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