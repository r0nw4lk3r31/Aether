import React from 'react';
import { 
  Files, Search, GitBranch, Calendar, CheckSquare, Mail, 
  Globe, UserCircle, FolderDot, BarChart2, Settings, MessageSquare, PanelLeft
} from 'lucide-react';

interface ActivityBarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  aiPanelVisible: boolean;
  sidebarVisible: boolean;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ 
  activeView, 
  setActiveView, 
  toggleSidebar,
  toggleAIPanel,
  aiPanelVisible,
  sidebarVisible 
}) => {
  // Array of activity icons
  const activities = [
    { id: 'explorer', icon: <Files size={24} />, tooltip: 'Explorer' },
    { id: 'search', icon: <Search size={24} />, tooltip: 'Search' },
    { id: 'git', icon: <GitBranch size={24} />, tooltip: 'Source Control' },
    { id: 'agenda', icon: <Calendar size={24} />, tooltip: 'Agenda' },
    { id: 'todo', icon: <CheckSquare size={24} />, tooltip: 'To Do' },
    { id: 'email', icon: <Mail size={24} />, tooltip: 'Email' },
    { id: 'browser', icon: <Globe size={24} />, tooltip: 'Browser' },
    { id: 'agents', icon: <UserCircle size={24} />, tooltip: 'Agents' },
    { id: 'fileManager', icon: <FolderDot size={24} />, tooltip: 'File Manager' },
    { id: 'stats', icon: <BarChart2 size={24} />, tooltip: 'Stats' }
  ];

  return (
    <div className="vs-activitybar bg-vscode-activitybar text-vscode-foreground border-r border-vscode-sidebar-border flex flex-col items-center py-2">
      {activities.map((activity) => (
        <div 
          key={activity.id} 
          className={`relative mb-2 p-2 cursor-pointer group ${
            activeView === activity.id ? 'text-vscode-accent' : 'text-vscode-foreground/70 hover:text-vscode-foreground'
          }`}
          onClick={() => {
            setActiveView(activity.id);
            toggleSidebar(); // Make sure sidebar is visible when clicking an activity
          }}
        >
          {activity.icon}
          
          {/* Left indicator for active item */}
          {activeView === activity.id && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vscode-accent"></div>
          )}
          
          {/* Tooltip */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-vscode-tooltip text-vscode-tooltip-foreground px-2 py-1 rounded opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs z-10">
            {activity.tooltip}
          </div>
        </div>
      ))}
      
      <div className="mt-auto">
        {/* Sidebar toggle button */}
        <div 
          className={`relative mb-2 p-2 cursor-pointer group ${
            !sidebarVisible ? 'text-vscode-accent' : 'text-vscode-foreground/70 hover:text-vscode-foreground'
          }`}
          onClick={toggleSidebar}
        >
          <PanelLeft size={24} />
          
          {/* Tooltip */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-vscode-tooltip text-vscode-tooltip-foreground px-2 py-1 rounded opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs z-10">
            {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
          </div>
        </div>
        
        {/* AI Assistant button */}
        <div 
          className={`relative mb-2 p-2 cursor-pointer group ${
            aiPanelVisible ? 'text-vscode-accent' : 'text-vscode-foreground/70 hover:text-vscode-foreground'
          }`}
          onClick={toggleAIPanel}
        >
          <MessageSquare size={24} />
          
          {/* Left indicator for active item */}
          {aiPanelVisible && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vscode-accent"></div>
          )}
          
          {/* Tooltip */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-vscode-tooltip text-vscode-tooltip-foreground px-2 py-1 rounded opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs z-10">
            AI Assistant
          </div>
        </div>
        
        {/* Settings */}
        <div 
          className={`relative p-2 cursor-pointer group ${
            activeView === 'settings' ? 'text-vscode-accent' : 'text-vscode-foreground/70 hover:text-vscode-foreground'
          }`}
          onClick={() => {
            setActiveView('settings');
            toggleSidebar(); // Make sure sidebar is visible when clicking settings
          }}
        >
          <Settings size={24} />
          
          {/* Left indicator for active item */}
          {activeView === 'settings' && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vscode-accent"></div>
          )}
          
          {/* Tooltip */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-vscode-tooltip text-vscode-tooltip-foreground px-2 py-1 rounded opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs z-10">
            Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityBar;
