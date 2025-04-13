
import React, { useState } from 'react';
import { CheckSquare, Square, Clock, Calendar, Plus, Trash, Edit } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

const TodoModule: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: 'Finish project proposal', completed: false, dueDate: '2025-04-15', priority: 'high' },
    { id: '2', title: 'Review code changes', completed: true, dueDate: '2025-04-13', priority: 'medium' },
    { id: '3', title: 'Update documentation', completed: false, dueDate: '2025-04-16', priority: 'low' }
  ]);
  
  const [newTodo, setNewTodo] = useState({ title: '', dueDate: '', priority: 'medium' as const });
  const [filter, setFilter] = useState('all');
  
  const addTodo = () => {
    if (newTodo.title) {
      setTodos([...todos, { 
        id: Date.now().toString(), 
        title: newTodo.title,
        completed: false,
        dueDate: newTodo.dueDate || undefined,
        priority: newTodo.priority
      }]);
      setNewTodo({ title: '', dueDate: '', priority: 'medium' });
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CheckSquare className="mr-2" />
        Todo List
      </h2>
      
      <div className="mb-6 bg-vscode-sidebar p-4 rounded">
        <h3 className="text-sm font-semibold mb-2">Add New Task</h3>
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            placeholder="Task Title"
            className="bg-vscode-editor border border-vscode-sidebar-border rounded p-2"
            value={newTodo.title}
            onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              placeholder="Due Date"
              className="bg-vscode-editor border border-vscode-sidebar-border rounded p-2"
              value={newTodo.dueDate}
              onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
            />
            <select
              className="bg-vscode-editor border border-vscode-sidebar-border rounded p-2"
              value={newTodo.priority}
              onChange={(e) => setNewTodo({...newTodo, priority: e.target.value as any})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <button 
            className="bg-vscode-accent text-white p-2 rounded flex items-center justify-center"
            onClick={addTodo}
          >
            <Plus className="mr-1 w-4 h-4" /> Add Task
          </button>
        </div>
      </div>
      
      <div className="mb-4 flex space-x-2">
        <button 
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-vscode-accent text-white' : 'bg-vscode-editor'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-vscode-accent text-white' : 'bg-vscode-editor'}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-vscode-accent text-white' : 'bg-vscode-editor'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      <div>
        {filteredTodos.length === 0 ? (
          <div className="text-vscode-foreground/50 text-center p-4">
            No tasks found
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTodos.map(todo => (
              <div 
                key={todo.id} 
                className={`flex items-center justify-between bg-vscode-editor border border-vscode-sidebar-border rounded p-3 ${todo.completed ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center">
                  <button 
                    className="mr-2 hover:text-vscode-accent"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed ? 
                      <CheckSquare className="w-5 h-5" /> : 
                      <Square className="w-5 h-5" />
                    }
                  </button>
                  <div>
                    <div className={`font-medium ${todo.completed ? 'line-through' : ''}`}>
                      {todo.title}
                    </div>
                    {todo.dueDate && (
                      <div className="text-sm text-vscode-foreground/70 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> 
                        {todo.dueDate}
                        <span className={`ml-2 font-medium ${getPriorityColor(todo.priority)}`}>
                          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="text-vscode-foreground/70 hover:text-vscode-accent"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    className="text-vscode-foreground/70 hover:text-destructive"
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-6 text-xs text-vscode-foreground/50 border-t border-vscode-sidebar-border pt-4">
        <p>Note: Tasks can be synced with the Agenda module to see your tasks in calendar view.</p>
      </div>
    </div>
  );
};

export default TodoModule;
