
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { TabItem } from './VSCodeLayout';
import AgendaModule from './modules/AgendaModule';
import TodoModule from './modules/TodoModule';
import EmailModule from './modules/EmailModule';
import BrowserModule from './modules/BrowserModule';
import AgentsModule from './modules/AgentsModule';
import FileManagerModule from './modules/FileManagerModule';
import StatsModule from './modules/StatsModule';
import SettingsModule from './modules/SettingsModule';

interface SideBarProps {
  activeView: string;
  openTab: (tab: TabItem) => void;
}

interface TreeItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon?: React.ReactNode;
  children?: TreeItem[];
  moduleType?: string;
}

// Sample file structure for explorer
const fileStructure: TreeItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        children: [
          { id: '3', name: 'ActivityBar.tsx', type: 'file' },
          { id: '4', name: 'SideBar.tsx', type: 'file' },
          { id: '5', name: 'EditorArea.tsx', type: 'file' }
        ]
      },
      {
        id: '6',
        name: 'modules',
        type: 'folder',
        children: [
          { id: '7', name: 'Agenda.tsx', type: 'file', moduleType: 'agenda' },
          { id: '8', name: 'Todo.tsx', type: 'file', moduleType: 'todo' },
          { id: '9', name: 'Email.tsx', type: 'file', moduleType: 'email' },
          { id: '10', name: 'Browser.tsx', type: 'file', moduleType: 'browser' },
          { id: '11', name: 'Agents.tsx', type: 'file', moduleType: 'agents' },
          { id: '12', name: 'FileManager.tsx', type: 'file', moduleType: 'fileManager' },
          { id: '13', name: 'Stats.tsx', type: 'file', moduleType: 'stats' },
          { id: '14', name: 'Settings.tsx', type: 'file', moduleType: 'settings' }
        ]
      },
      { id: '15', name: 'App.tsx', type: 'file' },
      { id: '16', name: 'index.tsx', type: 'file' }
    ]
  },
  {
    id: '17',
    name: 'public',
    type: 'folder',
    children: [
      { id: '18', name: 'index.html', type: 'file' },
      { id: '19', name: 'favicon.ico', type: 'file' }
    ]
  },
  { id: '20', name: 'package.json', type: 'file' },
  { id: '21', name: 'tsconfig.json', type: 'file' },
  { id: '22', name: 'README.md', type: 'file' }
];

const SideBar: React.FC<SideBarProps> = ({ activeView, openTab }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', '6']));
  
  const toggleFolder = (folderId: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (newExpandedFolders.has(folderId)) {
      newExpandedFolders.delete(folderId);
    } else {
      newExpandedFolders.add(folderId);
    }
    setExpandedFolders(newExpandedFolders);
  };

  const handleFileClick = (item: TreeItem) => {
    let tabContent;
    let moduleId;
    
    if (item.moduleType) {
      switch (item.moduleType) {
        case 'agenda':
          tabContent = <AgendaModule />;
          moduleId = 'agenda';
          break;
        case 'todo':
          tabContent = <TodoModule />;
          moduleId = 'todo';
          break;
        case 'email':
          tabContent = <EmailModule />;
          moduleId = 'email';
          break;
        case 'browser':
          tabContent = <BrowserModule />;
          moduleId = 'browser';
          break;
        case 'agents':
          tabContent = <AgentsModule />;
          moduleId = 'agents';
          break;
        case 'fileManager':
          tabContent = <FileManagerModule />;
          moduleId = 'fileManager';
          break;
        case 'stats':
          tabContent = <StatsModule />;
          moduleId = 'stats';
          break;
        case 'settings':
          tabContent = <SettingsModule />;
          moduleId = 'settings';
          break;
        default:
          tabContent = <div>File content for {item.name}</div>;
          moduleId = 'file';
      }
    } else {
      tabContent = <div>File content for {item.name}</div>;
      moduleId = 'file';
    }
    
    openTab({
      id: item.id,
      title: item.name,
      content: tabContent,
      moduleId,
      isDetachable: item.moduleType ? true : false
    });
  };

  const renderTree = (items: TreeItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} style={{ paddingLeft: `${level * 16}px` }}>
        {item.type === 'folder' ? (
          <div className="flex items-center py-0.5 hover:bg-vscode-selection group">
            <button
              className="mr-1 text-vscode-foreground/70"
              onClick={() => toggleFolder(item.id)}
            >
              {expandedFolders.has(item.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            <div className="flex items-center" onClick={() => toggleFolder(item.id)}>
              {expandedFolders.has(item.id) ? 
                <FolderOpen size={16} className="mr-1 text-vscode-accent" /> : 
                <Folder size={16} className="mr-1 text-vscode-accent" />}
              <span>{item.name}</span>
            </div>
          </div>
        ) : (
          <div 
            className="flex items-center py-0.5 pl-6 hover:bg-vscode-selection cursor-pointer"
            onClick={() => handleFileClick(item)}
          >
            {item.icon || <File size={16} className="mr-1 text-vscode-foreground/70" />}
            <span>{item.name}</span>
          </div>
        )}

        {item.type === 'folder' && expandedFolders.has(item.id) && item.children && 
          renderTree(item.children, level + 1)}
      </div>
    ));
  };

  // Content to display based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'explorer':
        return (
          <div>
            <div className="pt-1 px-4 pb-2 font-semibold flex items-center justify-between">
              EXPLORER
            </div>
            <div className="text-sm">
              {renderTree(fileStructure)}
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">SEARCH</h3>
            <input 
              type="text" 
              placeholder="Search in files"
              className="w-full bg-vscode-editor border border-vscode-sidebar-border rounded p-1 mb-4"
            />
            <div className="text-sm opacity-70">No results yet</div>
          </div>
        );
      case 'git':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">SOURCE CONTROL</h3>
            <div className="text-sm opacity-70">No changes detected</div>
          </div>
        );
      case 'agenda':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">AGENDA</h3>
            <button 
              className="w-full bg-vscode-accent text-white p-2 rounded mb-2"
              onClick={() => openTab({
                id: uuidv4(),
                title: "Agenda",
                content: <AgendaModule />,
                moduleId: 'agenda',
                isDetachable: true
              })}
            >
              Open Agenda
            </button>
            <div className="text-sm mt-4">
              <div className="font-semibold">Upcoming Events</div>
              <div className="opacity-70 mt-1">No upcoming events</div>
            </div>
          </div>
        );
      case 'todo':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">TO DO</h3>
            <button 
              className="w-full bg-vscode-accent text-white p-2 rounded mb-2"
              onClick={() => openTab({
                id: uuidv4(),
                title: "Todo",
                content: <TodoModule />,
                moduleId: 'todo',
                isDetachable: true
              })}
            >
              Open Todo List
            </button>
            <div className="text-sm mt-4">
              <div className="font-semibold">Priority Tasks</div>
              <div className="opacity-70 mt-1">No priority tasks</div>
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">EMAIL</h3>
            <button 
              className="w-full bg-vscode-accent text-white p-2 rounded mb-2"
              onClick={() => openTab({
                id: uuidv4(),
                title: "Email",
                content: <EmailModule />,
                moduleId: 'email',
                isDetachable: true
              })}
            >
              Open Email Client
            </button>
          </div>
        );
      case 'browser':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">BROWSER</h3>
            <button 
              className="w-full bg-vscode-accent text-white p-2 rounded mb-2"
              onClick={() => openTab({
                id: uuidv4(),
                title: "Browser",
                content: <BrowserModule />,
                moduleId: 'browser',
                isDetachable: true
              })}
            >
              Open Browser
            </button>
          </div>
        );
      case 'agents':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">AGENTS</h3>
            <button 
              className="w-full bg-vscode-accent text-white p-2 rounded mb-2"
              onClick={() => openTab({
                id: uuidv4(),
                title: "Agents",
                content: <AgentsModule />,
                moduleId: 'agents',
                isDetachable: true
              })}
            >
              Manage Agents
            </button>
          </div>
        );
      case 'fileManager':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">FILE MANAGER</h3>
            <button 
              className="w-full bg-vscode-accent text-white p-2 rounded mb-2"
              onClick={() => openTab({
                id: uuidv4(),
                title: "File Manager",
                content: <FileManagerModule />,
                moduleId: 'fileManager',
                isDetachable: true
              })}
            >
              Open File Manager
            </button>
          </div>
        );
      case 'stats':
        return (
          <div className="p-4">
            <h3 className="font-semibold mb-2">STATS</h3>
            <button 
              className="w-full bg-vscode-accent text-white p-2 rounded mb-2"
              onClick={() => openTab({
                id: uuidv4(),
                title: "Stats",
                content: <StatsModule />,
                moduleId: 'stats',
                isDetachable: true
              })}
            >
              View Statistics
            </button>
          </div>
        );
      default:
        return <div>Select a view</div>;
    }
  };

  return (
    <div className="vs-sidebar overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default SideBar;
