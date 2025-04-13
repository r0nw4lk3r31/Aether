
import React from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  Calendar, 
  ListTodo, 
  Mail, 
  Globe, 
  Bot, 
  BarChart4, 
  Settings,
  Folders
} from 'lucide-react';

interface ActivityBarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  toggleSidebar: () => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ 
  activeView, 
  setActiveView,
  toggleSidebar
}) => {
  const activities = [
    { id: 'explorer', icon: <Files size={24} />, tooltip: 'Explorer' },
    { id: 'search', icon: <Search size={24} />, tooltip: 'Search' },
    { id: 'git', icon: <GitBranch size={24} />, tooltip: 'Source Control' },
    { id: 'agenda', icon: <Calendar size={24} />, tooltip: 'Agenda' },
    { id: 'todo', icon: <ListTodo size={24} />, tooltip: 'To Do' },
    { id: 'email', icon: <Mail size={24} />, tooltip: 'Email' },
    { id: 'browser', icon: <Globe size={24} />, tooltip: 'Browser' },
    { id: 'agents', icon: <Bot size={24} />, tooltip: 'Agents' },
    { id: 'fileManager', icon: <Folders size={24} />, tooltip: 'File Manager' },
    { id: 'stats', icon: <BarChart4 size={24} />, tooltip: 'Stats' },
  ];

  return (
    <div className="vs-activity-bar flex flex-col items-center py-2">
      {activities.map((activity) => (
        <button
          key={activity.id}
          className={`p-2 my-1 rounded-md relative group ${
            activeView === activity.id ? 'text-vscode-accent' : 'text-vscode-foreground/70 hover:text-vscode-foreground'
          }`}
          onClick={() => {
            setActiveView(activity.id);
            toggleSidebar();
          }}
          title={activity.tooltip}
        >
          {activity.icon}
          {activeView === activity.id && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vscode-accent"></div>
          )}
          <span className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-vscode-activity-bar text-vscode-foreground px-2 py-1 rounded invisible group-hover:visible whitespace-nowrap z-10">
            {activity.tooltip}
          </span>
        </button>
      ))}
      
      <div className="mt-auto">
        <button 
          className="p-2 my-1 rounded-md text-vscode-foreground/70 hover:text-vscode-foreground"
          title="Settings"
        >
          <Settings size={24} />
        </button>
      </div>
    </div>
  );
};

export default ActivityBar;
