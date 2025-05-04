export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate: string | null;
    createdAt: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';
export type SortOption = 'newest' | 'oldest' | 'dueDate' | 'priority';
export type ThemeMode = 'light' | 'dark' | 'system';