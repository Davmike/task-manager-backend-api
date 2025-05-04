import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskFilter, SortOption } from '../types';

type TaskContextType = {
    tasks: Task[];
    filteredTasks: Task[];
    filter: TaskFilter;
    sortOption: SortOption;
    searchQuery: string;
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    toggleTaskCompletion: (id: string) => void;
    setFilter: (filter: TaskFilter) => void;
    setSortOption: (option: SortOption) => void;
    setSearchQuery: (query: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [filter, setFilter] = useState<TaskFilter>('all');
    const [sortOption, setSortOption] = useState<SortOption>('newest');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...task,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        setTasks([newTask, ...tasks]);
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks(
            tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
        );
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleTaskCompletion = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks
        .filter((task) => {
            // Filter by status
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        })
        .filter((task) => {
            // Filter by search query
            if (!searchQuery) return true;
            return (
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        })
        .sort((a, b) => {
            // Sort tasks
            switch (sortOption) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'dueDate':
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                case 'priority':
                    const priorityValue = { high: 3, medium: 2, low: 1 };
                    return priorityValue[b.priority] - priorityValue[a.priority];
                default:
                    return 0;
            }
        });

    return (
        <TaskContext.Provider
            value={{
                tasks,
                filteredTasks,
                filter,
                sortOption,
                searchQuery,
                addTask,
                updateTask,
                deleteTask,
                toggleTaskCompletion,
                setFilter,
                setSortOption,
                setSearchQuery,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};