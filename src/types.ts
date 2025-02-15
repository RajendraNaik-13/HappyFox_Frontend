export interface Employee {
    id: number;
    name: string;
    role: string;
    managerId: number | null;
    image: string | null;
  }