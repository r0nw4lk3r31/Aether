
import React from 'react';
import { GitBranch, Check, Wifi } from 'lucide-react';

const StatusBar: React.FC = () => {
  return (
    <div className="vs-statusbar flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="flex items-center px-2">
          <GitBranch className="w-3.5 h-3.5 mr-1" />
          <span>main</span>
        </div>
        <div className="flex items-center px-2">
          <Check className="w-3.5 h-3.5 mr-1" />
          <span>0 errors</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center px-2">
          <Wifi className="w-3.5 h-3.5 mr-1" />
          <span>Connected</span>
        </div>
        <div className="px-2">UTF-8</div>
        <div className="px-2">TypeScript</div>
      </div>
    </div>
  );
};

export default StatusBar;
