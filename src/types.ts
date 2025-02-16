export interface Employee {
  id: string;
  name: string;
  role: string;
  managerId: string | null;
  image?: string;
  team: string; 
}