import { useContext } from 'react';
import type { TaskListProps } from '../types';
import { ThemeContext } from '../contexts/ThemeContext';

export function TaskList({ tasks, onToggle, onDelete, filter, onFilterChange }: TaskListProps) {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Mis Tareas ({tasks.length})
        </h2>
        <select 
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className={`px-3 py-1 border rounded ${
            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        >
          <option>Todas</option>
          <option>Pendientes</option>
          <option>Completadas</option>
        </select>
      </div>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`p-3 border-l-4 rounded ${
              task.priority === 'alta' ? 'border-red-500 bg-red-50' :
              task.priority === 'media' ? 'border-yellow-500 bg-yellow-50' :
              'border-green-500 bg-green-50'
            } ${isDark ? 'bg-opacity-20' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  className="w-4 h-4"
                />
                <span className={`${task.completed ? 'line-through text-gray-500' : ''} ${
                  isDark ? 'text-gray-900' : 'text-gray-900'
                }`}>
                  {task.text}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  task.priority === 'alta' ? 'bg-red-200 text-red-800' :
                  task.priority === 'media' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
                } ${isDark ? 'bg-opacity-70' : ''}`}>
                  {task.priority}
                </span>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No hay tareas para mostrar
        </div>
      )}
    </div>
  );
}