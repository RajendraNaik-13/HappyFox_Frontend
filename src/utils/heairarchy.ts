import { Employee } from '../types';

export const checkForCircularReference = (
  employees: Employee[],
  draggedId: number,
  targetId: number
): boolean => {
  const wouldCreateCycle = (empId: number, targetId: number): boolean => {
    let current: number | null = targetId;
    while (current !== null) {
      if (current === empId) return true;
      const manager = employees.find(e => e.id === current);
      current = manager?.managerId ?? null;
    }
    return false;
  };

  return wouldCreateCycle(draggedId, targetId);
};