export interface Task {
  id: number;
  text: string;
  priority: 'alta' | 'media' | 'baja';
  completed: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}