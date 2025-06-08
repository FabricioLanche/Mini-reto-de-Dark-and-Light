import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export function ConceptsFooter() {
  const { isDark } = useContext(ThemeContext);
  
  const concepts = [
    'Componentes funcionales y props',
    'useState para manejo de estado', 
    'useEffect para efectos secundarios',
    'useRef para referencias DOM',
    'useContext para estado global',
    'createContext para crear contextos'
  ];
  
  return (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        ✅ Conceptos implementados:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {concepts.map((concept, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-green-500">✅</span>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {concept}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}