
import React from 'react';
import { FolderOpenDot, Save, Undo, Redo, Settings } from 'lucide-react';

const TitleBar: React.FC = () => {
  return (
    <div className="vs-titlebar flex justify-between select-none">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Code Nexus Workbench</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-1 rounded hover:bg-vscode-selection">
          <FolderOpenDot className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-vscode-selection">
          <Save className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-vscode-selection">
          <Undo className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-vscode-selection">
          <Redo className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-vscode-selection">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
