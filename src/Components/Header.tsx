import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { Search, X, CheckSquare } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

const Header: React.FC = () => {
    const { searchQuery, setSearchQuery } = useTasks();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
                : 'bg-white dark:bg-gray-900'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <CheckSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">TaskMaster</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-64 md:w-80' : 'w-48 md:w-64'
                        }`}>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                         bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                         transition-all duration-300"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;