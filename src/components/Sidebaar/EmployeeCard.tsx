import React from 'react';
import { Employee } from '../../types';
import { User } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onDragStart: (e: React.DragEvent, employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, employee)}
      className="p-3 text-black bg-white rounded shadow cursor-move hover:bg-gray-50 flex items-center gap-4 justify-between"
    >
      <div className='flex flex-row gap-4 '>
        
        <div className="flex flex-row h-12 w-12">
          {employee.image ? (
            <img
              src={employee.image}
              alt={employee.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '';
              }}
            />
          ) : (
            <User className="w-10 h-10 text-gray-300" />
          )}
        </div>
      <div className='flex flex-col items-start'>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-gray-600">{employee.role}</div>

        
        </div>
      </div>

      
      <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full">
        {employee.team}
      </span>
    </div>
  );
};
