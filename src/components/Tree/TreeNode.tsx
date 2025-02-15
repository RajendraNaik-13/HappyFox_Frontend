import React from 'react';
import { Trash2 } from 'lucide-react';
import { Employee } from '../../types';
import { User } from 'lucide-react';
interface TreeNodeProps {
  node: Employee;
  employees: Employee[];
  onDrop: (e: React.DragEvent, employee: Employee) => void;
  onDragStart: (e: React.DragEvent, employee: Employee) => void;
  onDelete?: (employeeId: number) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  employees,
  onDrop,
  onDragStart,
  onDelete,
}) => {
  const childNodes = employees.filter(emp => emp.managerId === node.id);

  return (
    <div className="flex flex-col items-center">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, node)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, node)}
        className="relative flex flex-row p-4 m-2 gap-7 justify-centeri bg-white rounded-lg shadow-md border-2 border-blue-200 w-48"
      >
        <div className='h-15 w-10 '>{node.image ? (
          <img  
            src={node.image} 
            alt={node.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '';
            }}
          />
        ) : (
          <User className="w-6 h-6 text-gray-400" />
        )}

        </div>
            <div>
            <div className="font-medium">{node.name}</div>
            <div className="text-sm text-gray-600">{node.role}</div>
            </div>
        
        
        
        {onDelete && (
          <Trash2 
            className="absolute top-2 right-2 w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" 
            onClick={() => onDelete(node.id)}
          />
        )}
      </div>
      {childNodes.length > 0 && (
        <div className="relative pt-4">
          <div className="absolute top-0 left-1/2 h-4 w-px bg-gray-300" />
          <div className="flex space-x-4">
            {childNodes.map(childNode => (
              <TreeNode
                key={childNode.id}
                node={childNode}
                employees={employees}
                onDrop={onDrop}
                onDragStart={onDragStart}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};