
import React, { useState } from 'react';
import { Bot, Play, Pause, Plus, Trash, Settings, RefreshCw, Eye } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'paused' | 'stopped';
  type: 'trading' | 'telegram' | 'twitter' | 'custom';
}

const AgentsModule: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { 
      id: '1', 
      name: 'Trading Bot Alpha', 
      description: 'Monitors cryptocurrency markets and executes trades based on predefined strategies.',
      status: 'running',
      type: 'trading'
    },
    { 
      id: '2', 
      name: 'Telegram Assistant', 
      description: 'Handles customer inquiries and provides automated responses on Telegram.',
      status: 'paused',
      type: 'telegram'
    },
    { 
      id: '3', 
      name: 'Twitter Monitor', 
      description: 'Tracks mentions and engages with followers automatically.',
      status: 'stopped',
      type: 'twitter'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'stopped': return 'text-red-500';
      default: return '';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trading': return '💹';
      case 'telegram': return '📱';
      case 'twitter': return '🐦';
      case 'custom': return '🤖';
      default: return '🤖';
    }
  };

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === id) {
        let newStatus: 'running' | 'paused' | 'stopped';
        if (agent.status === 'running') newStatus = 'paused';
        else if (agent.status === 'paused') newStatus = 'stopped';
        else newStatus = 'running';
        
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
  };

  const deleteAgent = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Bot className="mr-2" />
        Agents Manager
      </h2>
      
      <div className="mb-6 flex justify-between">
        <button className="bg-vscode-accent text-white px-3 py-2 rounded flex items-center">
          <Plus className="mr-1 w-4 h-4" /> Create New Agent
        </button>
        <button className="bg-vscode-editor border border-vscode-sidebar-border px-3 py-2 rounded flex items-center">
          <RefreshCw className="mr-1 w-4 h-4" /> Refresh Status
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {agents.map(agent => (
          <div 
            key={agent.id} 
            className="bg-vscode-editor border border-vscode-sidebar-border rounded-md overflow-hidden"
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold flex items-center">
                    <span className="mr-2">{getTypeIcon(agent.type)}</span>
                    {agent.name}
                  </h3>
                  <p className="text-sm text-vscode-foreground/70 mt-1">
                    {agent.description}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)} bg-opacity-20`}>
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </div>
              </div>
            </div>
            
            <div className="bg-vscode-sidebar border-t border-vscode-sidebar-border p-2 flex justify-between">
              <div className="flex space-x-2">
                <button 
                  className="p-1 rounded hover:bg-vscode-selection"
                  onClick={() => toggleAgentStatus(agent.id)}
                  title={agent.status === 'running' ? 'Pause' : 'Start'}
                >
                  {agent.status === 'running' ? 
                    <Pause className="w-5 h-5 text-yellow-500" /> : 
                    <Play className="w-5 h-5 text-green-500" />
                  }
                </button>
                <button 
                  className="p-1 rounded hover:bg-vscode-selection"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  className="p-1 rounded hover:bg-vscode-selection"
                  title="View Logs"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <button 
                className="p-1 rounded hover:bg-destructive hover:text-white"
                onClick={() => deleteAgent(agent.id)}
                title="Delete"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {agents.length === 0 && (
        <div className="text-center p-8 text-vscode-foreground/50">
          <Bot className="w-16 h-16 mx-auto mb-4" />
          <p>No agents configured. Create your first agent to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AgentsModule;
