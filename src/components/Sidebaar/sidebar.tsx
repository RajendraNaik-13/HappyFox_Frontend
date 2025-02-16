import React from 'react';
import { Employee } from '../../types';
import { EmployeeCard } from './EmployeeCard';

interface SidebarProps {
  employees: Employee[];
  onDragStart: (e: React.DragEvent, employee: Employee) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedTeam: string;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  employees,
  onDragStart,
  searchTerm,
  setSearchTerm,
  selectedTeam,
  setSelectedTeam,
}) => {
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTeam === '' || employee.team === selectedTeam)
  );

  return (
    <div className="w-90 bg-gray-100 text-black p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Employees</h2>

      
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
      />

      
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
        className="w-full px-2 py-1 mb-4 border border-gray-300 rounded"
      >
        <option value="">All Teams</option>
        {Array.from(new Set(employees.map(emp => emp.team))).map(team => (
          <option key={team} value={team}>{team}</option>
        ))}
      </select>

      
      <div className="space-y-2">
        {filteredEmployees.map(employee => (
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
