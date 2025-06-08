import { useState, useEffect, useRef } from 'react';
import './main.css';
import type { Task } from './types';
import { ThemeContext } from './contexts/ThemeContext';
import { TaskList } from './components/TaskList';
import { ConceptsFooter } from './components/ConceptsFooter';

export default function App() {
  // Estados para los componentes
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Aprender React Hooks', priority: 'alta', completed: false },
    { id: 2, text: 'Crear componentes reutilizables', priority: 'media', completed: false }
  ]);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<string>('Todas');
  const [isDark, setIsDark] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  
  //Actualizar el título de la página
  useEffect(() => {
    const pendingTasks = tasks.filter(t => !t.completed).length;
    document.title = `Tareas (${pendingTasks})`;
  }, [tasks]);
  
  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        text: newTask,
        priority: 'media',
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask('');
      inputRef.current?.focus();
    }
  };
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Cálculo de estadísticas
  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  
  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completadas') return task.completed;
    if (filter === 'Pendientes') return !task.completed;
    return true;
  });
  
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div className={`min-h-screen p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                👨‍🎓 ¡Hola, Estudiante!
              </h1>
              <p className="text-gray-500">Laboratorio de React Hooks</p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
          
          {/* Estadísticas */}
          <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {totalTasks}
                </div>
                <div className="text-sm text-gray-500">Total de tareas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-500">Completadas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{progress}%</div>
                <div className="text-sm text-gray-500">Progreso</div>
              </div>
            </div>
          </div>
          
          {/* Formulario para agregar tareas */}
          <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="¿Qué necesitas hacer?"
                className={`flex-1 px-3 py-2 border rounded ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                ➕ Agregar
              </button>
            </div>
          </div>
          
          {/* Lista de tareas */}
          <TaskList 
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            filter={filter}
            onFilterChange={setFilter}
          />
          
          {/* Footer con conceptos */}
          <ConceptsFooter />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}