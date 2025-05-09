import React from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import { ClipboardList } from 'lucide-react';

const TaskList: React.FC = () => {
    const { filteredTasks, filter } = useTasks();

    const renderEmptyState = () => {
        let message = '';
        let submessage = '';

        if (filter === 'all') {
            message = 'No tasks yet';
            submessage = 'Add your first task using the + button';
        } else if (filter === 'active') {
            message = 'No active tasks';
            submessage = 'All your tasks are completed!';
        } else if (filter === 'completed') {
            message = 'No completed tasks';
            submessage = 'Complete some tasks to see them here';
        }

        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <ClipboardList className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">{message}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{submessage}</p>
            </div>
        );
    };

    return (
        <div className="max-w-3xl mx-auto px-4 pb-20">
            <TaskFilter />

            <div className="mt-6 space-y-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))
                ) : (
                    renderEmptyState()
                )}
            </div>
        </div>
    );
};

export default TaskList;