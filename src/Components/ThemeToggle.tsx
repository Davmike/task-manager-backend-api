import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeMode } from '../types';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const options: { value: ThemeMode; icon: React.ReactNode; label: string }[] = [
        { value: 'light', icon: <Sun size={18} />, label: 'Light' },
        { value: 'dark', icon: <Moon size={18} />, label: 'Dark' },
        { value: 'system', icon: <Monitor size={18} />, label: 'System' },
    ];

    return (
        <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm transition-all duration-300">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded transition-all duration-200 ${theme === option.value
                        ? 'bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                    aria-label={`Switch to ${option.label} mode`}
                >
                    <span className="transition-transform duration-300 hover:scale-110">
                        {option.icon}
                    </span>
                    <span className="hidden sm:inline text-sm font-medium">{option.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ThemeToggle;