import React from 'react';
import { Employee } from '../../types';
import { EmployeeCard } from './EmployeeCard';

interface SidebarProps {
  employees: Employee[];
  onDragStart: (e: React.DragEvent, employee: Employee) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ employees, onDragStart }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <div className="space-y-2">
        {employees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};