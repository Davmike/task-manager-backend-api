import { TaskProvider } from './contexts/TaskContext';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="container mx-auto py-6">
          <TaskList />
          <TaskForm />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;