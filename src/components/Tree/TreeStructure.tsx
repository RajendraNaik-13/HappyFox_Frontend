import React from 'react';
import { TreeNode } from './TreeNode';
import { Employee } from '../../types';

interface TreeStructureProps {
  employees: Employee[];
  onDrop: (e: React.DragEvent, employee: Employee) => void;
  onDragStart: (e: React.DragEvent, employee: Employee) => void;
  onDelete?: (employeeId: number) => void;
}

export const TreeStructure: React.FC<TreeStructureProps> = ({
  employees,
  onDrop,
  onDragStart,
  onDelete,
}) => {
  const rootNode = employees.find(emp => emp.managerId === null);

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex justify-center">
        {rootNode && (
          <TreeNode
            node={rootNode}
            employees={employees}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
};