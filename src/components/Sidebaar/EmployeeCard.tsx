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
      className="p-3 bg-white rounded shadow cursor-move hover:bg-gray-50"
    >
    <div className='flex flex-row justify-center gap-6'>
    <div className='h-15 w-10'>{employee.image ? (
          <img  
            
            src={employee.image} 
            alt={employee.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '';
            }}
          />
        ) : (
          <User className="w-6 h-6 text-gray-400" />
        )}</div>
    <div>
    <div className="font-medium">{employee.name}</div>
    <div className="text-sm text-gray-600">{employee.role}</div>
    </div>
      
      
    </div>
    
    </div>
  );
};