
import React, { useState } from 'react';
import { Settings, Key, User, Globe, Bell, Shield, Moon, Sun, Bot, Mail, BellRing, BellOff, Eye, Twitter, Trash } from 'lucide-react';

const SettingsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [apiKeys, setApiKeys] = useState({
    googleCalendar: '••••••••••••••••',
    telegram: '••••••••••••••••',
    twitter: '••••••••••••••••',
    openai: '••••••••••••••••',
  });

  const [envVars, setEnvVars] = useState([
    { id: '1', key: 'DATABASE_URL', value: '••••••••••••••••', isSecret: true },
    { id: '2', key: 'API_BASE_URL', value: 'https://api.example.com', isSecret: false },
    { id: '3', key: 'LOG_LEVEL', value: 'info', isSecret: false },
    { id: '4', key: 'CACHE_TTL', value: '3600', isSecret: false },
  ]);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newEnvVar, setNewEnvVar] = useState({ key: '', value: '', isSecret: false });

  const updateApiKey = (key: string, value: string) => {
    setApiKeys({
      ...apiKeys,
      [key]: value
    });
  };

  const addEnvVar = () => {
    if (newEnvVar.key && newEnvVar.value) {
      setEnvVars([
        ...envVars,
        { 
          id: Date.now().toString(),
          key: newEnvVar.key,
          value: newEnvVar.value,
          isSecret: newEnvVar.isSecret
        }
      ]);
      setNewEnvVar({ key: '', value: '', isSecret: false });
    }
  };

  const updateEnvVar = (id: string, key: string, value: string) => {
    setEnvVars(envVars.map(env => 
      env.id === id ? { ...env, [key]: value } : env
    ));
  };

  const deleteEnvVar = (id: string) => {
    setEnvVars(envVars.filter(env => env.id !== id));
  };

  return (
    <div className="h-full flex">
      <div className="w-64 bg-vscode-sidebar border-r border-vscode-sidebar-border">
        <div className="p-4 border-b border-vscode-sidebar-border">
          <h2 className="text-lg font-semibold flex items-center">
            <Settings className="mr-2 w-5 h-5" />
            Settings
          </h2>
        </div>
        
        <div className="py-2">
          <button 
            className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'general' ? 'bg-vscode-selection text-vscode-accent' : 'hover:bg-vscode-editor'}`}
            onClick={() => setActiveTab('general')}
          >
            <Settings className="w-4 h-4 mr-2" />
            General
          </button>
          
          <button 
            className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'api-keys' ? 'bg-vscode-selection text-vscode-accent' : 'hover:bg-vscode-editor'}`}
            onClick={() => setActiveTab('api-keys')}
          >
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </button>
          
          <button 
            className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'env-vars' ? 'bg-vscode-selection text-vscode-accent' : 'hover:bg-vscode-editor'}`}
            onClick={() => setActiveTab('env-vars')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Environment Variables
          </button>
          
          <button 
            className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'account' ? 'bg-vscode-selection text-vscode-accent' : 'hover:bg-vscode-editor'}`}
            onClick={() => setActiveTab('account')}
          >
            <User className="w-4 h-4 mr-2" />
            Account
          </button>
          
          <button 
            className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'appearance' ? 'bg-vscode-selection text-vscode-accent' : 'hover:bg-vscode-editor'}`}
            onClick={() => setActiveTab('appearance')}
          >
            <Sun className="w-4 h-4 mr-2" />
            Appearance
          </button>
          
          <button 
            className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'notifications' ? 'bg-vscode-selection text-vscode-accent' : 'hover:bg-vscode-editor'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </button>
          
          <button 
            className={`w-full text-left px-4 py-2 flex items-center ${activeTab === 'integrations' ? 'bg-vscode-selection text-vscode-accent' : 'hover:bg-vscode-editor'}`}
            onClick={() => setActiveTab('integrations')}
          >
            <Globe className="w-4 h-4 mr-2" />
            Integrations
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'general' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">General Settings</h2>
            
            <div className="grid gap-6">
              <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-md p-4">
                <h3 className="text-sm font-semibold mb-4">Application</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto Save</div>
                      <div className="text-sm text-vscode-foreground/70">Automatically save changes</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked />
                      <div className="w-11 h-6 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vscode-accent"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Telemetry</div>
                      <div className="text-sm text-vscode-foreground/70">Send anonymous usage data</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vscode-accent"></div>
                    </label>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1">Editor Font Size</div>
                    <input 
                      type="range" 
                      min="10" 
                      max="24" 
                      value="14"
                      className="w-full h-2 bg-vscode-sidebar rounded-lg appearance-none cursor-pointer accent-vscode-accent"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>10px</span>
                      <span>14px</span>
                      <span>24px</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1">Language</div>
                    <select className="w-full p-2 bg-vscode-editor border border-vscode-sidebar-border rounded">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-md p-4">
                <h3 className="text-sm font-semibold mb-4">Performance</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Hardware Acceleration</div>
                      <div className="text-sm text-vscode-foreground/70">Use GPU for rendering</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked />
                      <div className="w-11 h-6 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vscode-accent"></div>
                    </label>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1">Memory Limit</div>
                    <select className="w-full p-2 bg-vscode-editor border border-vscode-sidebar-border rounded">
                      <option>2 GB</option>
                      <option>4 GB</option>
                      <option>8 GB</option>
                      <option>16 GB</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'api-keys' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">API Keys</h2>
            
            <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-md p-4 mb-6">
              <div className="mb-4 bg-yellow-500/10 text-yellow-500 p-3 rounded">
                <p className="text-sm">API keys are stored securely and used for integrations with external services.</p>
              </div>
              
              <div className="grid gap-4">
                <div>
                  <div className="font-medium mb-1 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Google Calendar API Key
                  </div>
                  <div className="flex">
                    <input 
                      type={editingKey === 'googleCalendar' ? 'text' : 'password'} 
                      value={apiKeys.googleCalendar}
                      onChange={(e) => updateApiKey('googleCalendar', e.target.value)}
                      className="flex-1 p-2 bg-vscode-editor border border-vscode-sidebar-border rounded-l"
                    />
                    <button 
                      className="px-3 bg-vscode-editor border border-l-0 border-vscode-sidebar-border rounded-r"
                      onClick={() => setEditingKey(editingKey === 'googleCalendar' ? null : 'googleCalendar')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-1 flex items-center">
                    <Bot className="w-4 h-4 mr-2" />
                    Telegram Bot API Key
                  </div>
                  <div className="flex">
                    <input 
                      type={editingKey === 'telegram' ? 'text' : 'password'} 
                      value={apiKeys.telegram}
                      onChange={(e) => updateApiKey('telegram', e.target.value)}
                      className="flex-1 p-2 bg-vscode-editor border border-vscode-sidebar-border rounded-l"
                    />
                    <button 
                      className="px-3 bg-vscode-editor border border-l-0 border-vscode-sidebar-border rounded-r"
                      onClick={() => setEditingKey(editingKey === 'telegram' ? null : 'telegram')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-1 flex items-center">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter API Key
                  </div>
                  <div className="flex">
                    <input 
                      type={editingKey === 'twitter' ? 'text' : 'password'} 
                      value={apiKeys.twitter}
                      onChange={(e) => updateApiKey('twitter', e.target.value)}
                      className="flex-1 p-2 bg-vscode-editor border border-vscode-sidebar-border rounded-l"
                    />
                    <button 
                      className="px-3 bg-vscode-editor border border-l-0 border-vscode-sidebar-border rounded-r"
                      onClick={() => setEditingKey(editingKey === 'twitter' ? null : 'twitter')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-1 flex items-center">
                    <Bot className="w-4 h-4 mr-2" />
                    OpenAI API Key
                  </div>
                  <div className="flex">
                    <input 
                      type={editingKey === 'openai' ? 'text' : 'password'} 
                      value={apiKeys.openai}
                      onChange={(e) => updateApiKey('openai', e.target.value)}
                      className="flex-1 p-2 bg-vscode-editor border border-vscode-sidebar-border rounded-l"
                    />
                    <button 
                      className="px-3 bg-vscode-editor border border-l-0 border-vscode-sidebar-border rounded-r"
                      onClick={() => setEditingKey(editingKey === 'openai' ? null : 'openai')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-vscode-accent text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'env-vars' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Environment Variables</h2>
            
            <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-md p-4 mb-6">
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Add New Variable</h3>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Key"
                    value={newEnvVar.key}
                    onChange={(e) => setNewEnvVar({...newEnvVar, key: e.target.value})}
                    className="flex-1 p-2 bg-vscode-editor border border-vscode-sidebar-border rounded"
                  />
                  <input 
                    type="text" 
                    placeholder="Value"
                    value={newEnvVar.value}
                    onChange={(e) => setNewEnvVar({...newEnvVar, value: e.target.value})}
                    className="flex-1 p-2 bg-vscode-editor border border-vscode-sidebar-border rounded"
                  />
                  <div className="flex items-center whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      id="is-secret" 
                      checked={newEnvVar.isSecret}
                      onChange={(e) => setNewEnvVar({...newEnvVar, isSecret: e.target.checked})}
                      className="mr-1"
                    />
                    <label htmlFor="is-secret" className="text-sm">Secret</label>
                  </div>
                  <button 
                    className="bg-vscode-accent text-white px-3 py-2 rounded"
                    onClick={addEnvVar}
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <h3 className="text-sm font-semibold mb-3">Current Variables</h3>
              <div className="grid gap-2">
                {envVars.map(env => (
                  <div key={env.id} className="flex items-center gap-2 bg-vscode-sidebar p-2 rounded">
                    <div className="font-medium text-sm">{env.key}</div>
                    <div className="flex-1 text-sm bg-vscode-editor p-1.5 rounded overflow-hidden text-ellipsis">
                      {editingKey === env.id ? env.value : (env.isSecret ? '••••••••••••••••' : env.value)}
                    </div>
                    <button 
                      className="p-1 hover:bg-vscode-selection rounded"
                      onClick={() => setEditingKey(editingKey === env.id ? null : env.id)}
                      title={editingKey === env.id ? 'Hide' : 'Show/Edit'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1 hover:bg-destructive hover:text-white rounded"
                      onClick={() => deleteEnvVar(env.id)}
                      title="Delete"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-vscode-accent text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'appearance' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Appearance</h2>
            
            <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-md p-4 mb-6">
              <h3 className="text-sm font-semibold mb-4">Theme</h3>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-vscode-foreground/70">Switch between light and dark theme</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div className="w-11 h-6 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vscode-accent"></div>
                  <span className="ml-2">{darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}</span>
                </label>
              </div>
              
              <h3 className="text-sm font-semibold mb-4">Color Theme</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="border-2 border-vscode-accent rounded overflow-hidden cursor-pointer">
                  <div className="h-20 bg-[#1E1E1E]">
                    <div className="h-5 bg-[#333333]"></div>
                    <div className="p-2">
                      <div className="h-2 w-1/2 bg-[#007ACC] mb-1 rounded"></div>
                      <div className="h-2 w-3/4 bg-[#3C3C3C] mb-1 rounded"></div>
                      <div className="h-2 w-2/3 bg-[#3C3C3C] rounded"></div>
                    </div>
                  </div>
                  <div className="p-2 text-center text-sm">Dark+ (default)</div>
                </div>
                
                <div className="border border-vscode-sidebar-border rounded overflow-hidden cursor-pointer">
                  <div className="h-20 bg-[#252526]">
                    <div className="h-5 bg-[#3C3C3C]"></div>
                    <div className="p-2">
                      <div className="h-2 w-1/2 bg-[#1B80B2] mb-1 rounded"></div>
                      <div className="h-2 w-3/4 bg-[#505050] mb-1 rounded"></div>
                      <div className="h-2 w-2/3 bg-[#505050] rounded"></div>
                    </div>
                  </div>
                  <div className="p-2 text-center text-sm">Monokai</div>
                </div>
                
                <div className="border border-vscode-sidebar-border rounded overflow-hidden cursor-pointer">
                  <div className="h-20 bg-[#2D2D2D]">
                    <div className="h-5 bg-[#1E1E1E]"></div>
                    <div className="p-2">
                      <div className="h-2 w-1/2 bg-[#D7BA7D] mb-1 rounded"></div>
                      <div className="h-2 w-3/4 bg-[#4D4D4D] mb-1 rounded"></div>
                      <div className="h-2 w-2/3 bg-[#4D4D4D] rounded"></div>
                    </div>
                  </div>
                  <div className="p-2 text-center text-sm">Solarized Dark</div>
                </div>
              </div>
            </div>
            
            <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-md p-4">
              <h3 className="text-sm font-semibold mb-4">Font Settings</h3>
              
              <div className="grid gap-4">
                <div>
                  <div className="font-medium mb-1">Font Family</div>
                  <select className="w-full p-2 bg-vscode-editor border border-vscode-sidebar-border rounded">
                    <option>Consolas</option>
                    <option>Courier New</option>
                    <option>Fira Code</option>
                    <option>JetBrains Mono</option>
                    <option>Menlo</option>
                  </select>
                </div>
                
                <div>
                  <div className="font-medium mb-1">Font Size</div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="10" 
                      max="24" 
                      value="14"
                      className="flex-1 h-2 bg-vscode-sidebar rounded-lg appearance-none cursor-pointer accent-vscode-accent"
                    />
                    <span className="w-8 text-center">14</span>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-1">Line Height</div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="10" 
                      max="30" 
                      value="20"
                      className="flex-1 h-2 bg-vscode-sidebar rounded-lg appearance-none cursor-pointer accent-vscode-accent"
                    />
                    <span className="w-8 text-center">20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Notifications</h2>
            
            <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-md p-4 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-medium flex items-center">
                    {notifications ? <BellRing className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
                    Enable Notifications
                  </div>
                  <div className="text-sm text-vscode-foreground/70">Receive alerts and updates</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vscode-accent"></div>
                </label>
              </div>
              
              {notifications && (
                <div className="space-y-4">
                  <div className="p-3 border border-vscode-sidebar-border rounded">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Task Reminders</div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vscode-accent"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-vscode-sidebar-border rounded">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Email Notifications</div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vscode-accent"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-vscode-sidebar-border rounded">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Agent Status Updates</div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vscode-accent"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-vscode-sidebar-border rounded">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">System Alerts</div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-9 h-5 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vscode-accent"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1">Notification Sound</div>
                    <select className="w-full p-2 bg-vscode-editor border border-vscode-sidebar-border rounded">
                      <option>Default</option>
                      <option>Chime</option>
                      <option>Bell</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button className="bg-vscode-accent text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'account' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            
            <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-md p-4 mb-6">
              <div className="flex items-start mb-6">
                <div className="bg-vscode-sidebar h-16 w-16 rounded-full flex items-center justify-center text-2xl mr-4">
                  A
                </div>
                <div>
                  <h3 className="font-semibold">Admin User</h3>
                  <p className="text-sm text-vscode-foreground/70">admin@example.com</p>
                  <button className="text-vscode-accent text-sm mt-1">Change Profile Picture</button>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div>
                  <div className="font-medium mb-1">Full Name</div>
                  <input 
                    type="text" 
                    value="Admin User"
                    className="w-full p-2 bg-vscode-editor border border-vscode-sidebar-border rounded"
                  />
                </div>
                
                <div>
                  <div className="font-medium mb-1">Email Address</div>
                  <input 
                    type="email" 
                    value="admin@example.com"
                    className="w-full p-2 bg-vscode-editor border border-vscode-sidebar-border rounded"
                  />
                </div>
                
                <div>
                  <div className="font-medium mb-1">Password</div>
                  <button className="text-vscode-accent">Change Password</button>
                </div>
                
                <div>
                  <div className="font-medium mb-1">Two-Factor Authentication</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-vscode-foreground/70">Add an extra layer of security</div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-vscode-sidebar peer-focus:outline-none peer-focus:ring-vscode-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vscode-accent"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button className="bg-destructive text-white px-4 py-2 rounded">
                Delete Account
              </button>
              <button className="bg-vscode-accent text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsModule;
