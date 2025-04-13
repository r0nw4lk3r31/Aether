
import React from 'react';
import { TabItem } from './VSCodeLayout';

interface EditorAreaProps {
  activeTabId: string | null;
  tabs: TabItem[];
}

const EditorArea: React.FC<EditorAreaProps> = ({ activeTabId, tabs }) => {
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="vs-editor overflow-auto flex-1">
      {activeTab ? (
        <div className="h-full">
          {activeTab.content}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-vscode-foreground/50 flex-col">
          <div className="text-2xl mb-2">Code Nexus Workbench</div>
          <div className="text-sm max-w-md text-center">
            Open a file from the explorer or a module from the activity bar to get started.
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorArea;
