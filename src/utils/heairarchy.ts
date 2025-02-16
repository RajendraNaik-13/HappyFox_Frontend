import { Employee } from '../types';

export const checkForCircularReference = (
  employees: Employee[],
  draggedId: string,  
  targetId: string    
): boolean => {
  const wouldCreateCycle = (empId: string, targetId: string): boolean => {
    let current: string | null = targetId;
    while (current !== null) {
      if (current === empId) return true;
      const manager = employees.find(e => e.id === current);
      current = manager?.managerId ?? null;
    }
    return false;
  };

  return wouldCreateCycle(draggedId, targetId);
};
