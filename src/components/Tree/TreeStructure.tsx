import React, { useState, useEffect, useRef } from 'react';
import { TreeNode } from './TreeNode';
import { Employee } from '../../types';
import { Plus, Minus } from 'lucide-react';

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
  const [zoomLevel, setZoomLevel] = useState(1);
  const treeRef = useRef<HTMLDivElement | null>(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  const handleWheelZoom = (e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault(); // Prevent default zoom behavior
      if (e.deltaY < 0) handleZoomIn();
      else handleZoomOut();
    }
  };

  useEffect(() => {
    const treeElement = treeRef.current;
    if (treeElement) {
      treeElement.addEventListener("wheel", handleWheelZoom, { passive: false });
    }
    return () => {
      if (treeElement) {
        treeElement.removeEventListener("wheel", handleWheelZoom);
      }
    };
  }, []);

  const rootNode = employees.find(emp => emp.managerId === null);

  return (
    <div ref={treeRef} className="flex-1 p-8 overflow-auto relative">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex space-x-2 bg-gray-200 p-2 rounded-lg shadow-md">
        <button onClick={handleZoomOut} className="p-2 bg-white rounded-md hover:bg-gray-300">
          <Minus className="w-5 h-5" />
        </button>
        <button onClick={handleZoomIn} className="p-2 bg-white rounded-md hover:bg-gray-300">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center">
        <div className="transform transition-transform duration-300" style={{ transform: `scale(${zoomLevel})` }}>
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
    </div>
  );
};
