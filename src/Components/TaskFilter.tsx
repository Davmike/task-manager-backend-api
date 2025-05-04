import React from 'react';
import { ListFilter, SortDesc } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';
import { TaskFilter as FilterType, SortOption } from '../types';

const TaskFilter: React.FC = () => {
    const { filter, setFilter, sortOption, setSortOption } = useTasks();

    const filters: { value: FilterType; label: string }[] = [
        { value: 'all', label: 'All Tasks' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
    ];

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'dueDate', label: 'Due Date' },
        { value: 'priority', label: 'Priority' },
    ];

    return (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                        <ListFilter size={18} className="mr-2" />
                        <span className="text-sm font-medium">Filter</span>
                    </div>
                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md p-1">
                        {filters.map((item) => (
                            <button
                                key={item.value}
                                onClick={() => setFilter(item.value)}
                                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === item.value
                                        ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                        <SortDesc size={18} className="mr-2" />
                        <span className="text-sm font-medium">Sort</span>
                    </div>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TaskFilter;