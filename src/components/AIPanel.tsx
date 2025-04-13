
import React from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';

interface AIPanelProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const AIPanel: React.FC<AIPanelProps> = ({ isVisible, toggleVisibility }) => {
  const [messages, setMessages] = React.useState<{ text: string; isAI: boolean }[]>([
    { text: "Hi there! I'm your AI assistant. How can I help you today?", isAI: true }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isPanelMaximized, setIsPanelMaximized] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isAI: false }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm a simulated AI response. In a real implementation, I would process your query and provide helpful information.", 
        isAI: true 
      }]);
    }, 1000);
    
    setInputValue('');
  };

  const toggleMaximize = () => {
    setIsPanelMaximized(!isPanelMaximized);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`flex flex-col border-l border-vscode-sidebar-border bg-vscode-background
        ${isPanelMaximized ? 'w-2/3' : 'w-80'} transition-all duration-300`}
    >
      <div className="flex items-center justify-between border-b border-vscode-sidebar-border p-2">
        <div className="text-sm font-medium">AI Assistant</div>
        <div className="flex space-x-2">
          <button 
            onClick={toggleMaximize}
            className="p-1 hover:bg-vscode-selection rounded"
          >
            {isPanelMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button 
            onClick={toggleVisibility}
            className="p-1 hover:bg-vscode-selection rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-3 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`p-2 rounded-lg ${msg.isAI 
              ? 'bg-vscode-editor text-vscode-foreground' 
              : 'bg-vscode-accent text-white ml-auto'} 
              max-w-[85%]`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-vscode-sidebar-border p-2">
        <div className="flex">
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Ask me anything..."
            className="flex-1 bg-vscode-editor border border-vscode-sidebar-border rounded p-2 text-sm"
          />
          <button 
            type="submit" 
            className="ml-2 bg-vscode-accent text-white px-3 py-2 rounded text-sm"
            disabled={!inputValue.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIPanel;
