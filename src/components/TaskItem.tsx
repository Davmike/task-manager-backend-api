import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, Edit, Trash2, Clock } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';
import { Task } from '../types';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { updateTask, deleteTask, toggleTaskCompletion } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
    const [editPriority, setEditPriority] = useState(task.priority);

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateTask(task.id, {
            title: editTitle,
            description: editDescription,
            dueDate: editDueDate || null,
            priority: editPriority,
        });
        setIsEditing(false);
    };

    const priorityClasses = {
        low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
        high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };

    const priorityLabels = {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
    };

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    const formattedCreatedDate = formatDate(task.createdAt);

    if (isEditing) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md">
                <form onSubmit={handleEditSubmit} className="p-4">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Task title"
                        required
                    />

                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                        placeholder="Task description"
                        rows={3}
                    />

                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                            <input
                                type="date"
                                value={editDueDate}
                                onChange={(e) => setEditDueDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                            <select
                                value={editPriority}
                                onChange={(e) => setEditPriority(e.target.value as Task['priority'])}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 
                 overflow-hidden transition-all duration-300 hover:shadow-md 
                 ${task.completed ? 'opacity-75' : ''}`}
        >
            <div className="p-4">
                <div className="flex items-start">
                    <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="mt-1 mr-3 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 focus:outline-none"
                        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                        {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                        ) : (
                            <Circle className="h-5 w-5" />
                        )}
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                            <h3
                                className={`text-lg font-medium ${task.completed
                                    ? 'text-gray-500 dark:text-gray-400 line-through'
                                    : 'text-gray-900 dark:text-white'
                                    }`}
                            >
                                {task.title}
                            </h3>
                            <span
                                className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityClasses[task.priority]}`}
                            >
                                {priorityLabels[task.priority]}
                            </span>
                        </div>

                        {task.description && (
                            <p className="mt-1 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                                {task.description}
                            </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Created {formattedCreatedDate}</span>
                            </div>

                            {task.dueDate && (
                                <div className={`flex items-center ${isOverdue ? 'text-red-600 dark:text-red-400' : ''}`}>
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{isOverdue ? 'Overdue: ' : 'Due: '}{formatDate(task.dueDate)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={() => {
                            setEditTitle(task.title);
                            setEditDescription(task.description);
                            setEditDueDate(task.dueDate || '');
                            setEditPriority(task.priority);
                            setIsEditing(true);
                        }}
                        className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                        aria-label="Edit task"
                    >
                        <Edit size={18} />
                    </button>

                    <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        aria-label="Delete task"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;