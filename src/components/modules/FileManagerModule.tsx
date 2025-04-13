import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown, Upload, Download, Trash, FilePlus, FolderPlus, Move, FolderOpen } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
  children?: FileItem[];
}

const FileManagerModule: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      modified: '2025-04-10',
      children: [
        { id: '1-1', name: 'Report.pdf', type: 'file', size: '2.4 MB', modified: '2025-04-09' },
        { id: '1-2', name: 'Presentation.pptx', type: 'file', size: '5.8 MB', modified: '2025-04-08' }
      ]
    },
    {
      id: '2',
      name: 'Images',
      type: 'folder',
      modified: '2025-04-11',
      children: [
        { id: '2-1', name: 'screenshot.png', type: 'file', size: '1.2 MB', modified: '2025-04-11' },
        { id: '2-2', name: 'profile.jpg', type: 'file', size: '0.8 MB', modified: '2025-04-07' }
      ]
    },
    { id: '3', name: 'config.json', type: 'file', size: '4 KB', modified: '2025-04-12' },
    { id: '4', name: 'notes.txt', type: 'file', size: '12 KB', modified: '2025-04-13' }
  ]);
  
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1']));
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('list');
  
  const toggleFolder = (folderId: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (expandedFolders.has(folderId)) {
      newExpandedFolders.delete(folderId);
    } else {
      newExpandedFolders.add(folderId);
    }
    setExpandedFolders(newExpandedFolders);
  };

  const renderFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return expandedFolders.has(item.id) ? 
        <FolderOpen className="w-5 h-5 text-vscode-accent" /> : 
        <Folder className="w-5 h-5 text-vscode-accent" />;
    }
    
    // Determine file icon based on extension
    const extension = item.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <File className="w-5 h-5 text-red-400" />;
      case 'jpg':
      case 'png':
      case 'gif':
        return <File className="w-5 h-5 text-blue-400" />;
      case 'docx':
      case 'doc':
        return <File className="w-5 h-5 text-blue-600" />;
      case 'xlsx':
      case 'xls':
        return <File className="w-5 h-5 text-green-600" />;
      case 'pptx':
      case 'ppt':
        return <File className="w-5 h-5 text-orange-500" />;
      case 'json':
        return <File className="w-5 h-5 text-yellow-400" />;
      case 'txt':
        return <File className="w-5 h-5 text-gray-400" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <div 
          className="flex items-center py-1 hover:bg-vscode-selection cursor-pointer" 
          style={{ paddingLeft: `${(level * 20) + 8}px` }}
          onClick={item.type === 'folder' ? () => toggleFolder(item.id) : undefined}
        >
          {item.type === 'folder' && (
            <button className="mr-1">
              {expandedFolders.has(item.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          <div className="mr-2">
            {renderFileIcon(item)}
          </div>
          <span>{item.name}</span>
        </div>
        
        {item.type === 'folder' && expandedFolders.has(item.id) && item.children && 
          renderFileTree(item.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="h-full flex">
      <div className="w-64 bg-vscode-sidebar border-r border-vscode-sidebar-border overflow-y-auto">
        <div className="p-2 border-b border-vscode-sidebar-border flex justify-between items-center">
          <h3 className="font-semibold">Files</h3>
          <div className="flex">
            <button className="p-1 rounded hover:bg-vscode-selection" title="New File">
              <FilePlus className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-vscode-selection" title="New Folder">
              <FolderPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-2">
          {renderFileTree(files)}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="p-2 border-b border-vscode-sidebar-border flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="p-1 rounded hover:bg-vscode-selection" title="Upload">
              <Upload className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-vscode-selection" title="Download">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-vscode-selection" title="Move">
              <Move className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-vscode-selection text-destructive" title="Delete">
              <Trash className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className={`p-1 rounded ${currentView === 'grid' ? 'bg-vscode-selection' : 'hover:bg-vscode-selection'}`}
              onClick={() => setCurrentView('grid')}
              title="Grid View"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button 
              className={`p-1 rounded ${currentView === 'list' ? 'bg-vscode-selection' : 'hover:bg-vscode-selection'}`}
              onClick={() => setCurrentView('list')}
              title="List View"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-auto">
          {currentView === 'list' ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-vscode-sidebar-border">
                  <th className="text-left pb-2">Name</th>
                  <th className="text-left pb-2">Size</th>
                  <th className="text-left pb-2">Modified</th>
                </tr>
              </thead>
              <tbody>
                {files.map(item => (
                  <React.Fragment key={item.id}>
                    <tr className="hover:bg-vscode-selection cursor-pointer">
                      <td className="py-2 flex items-center">
                        <span className="mr-2">{renderFileIcon(item)}</span>
                        {item.name}
                      </td>
                      <td>{item.size || '--'}</td>
                      <td>{item.modified || '--'}</td>
                    </tr>
                    {item.type === 'folder' && expandedFolders.has(item.id) && item.children && 
                      item.children.map(child => (
                        <tr key={child.id} className="hover:bg-vscode-selection cursor-pointer">
                          <td className="py-2 flex items-center pl-6">
                            <span className="mr-2">{renderFileIcon(child)}</span>
                            {child.name}
                          </td>
                          <td>{child.size || '--'}</td>
                          <td>{child.modified || '--'}</td>
                        </tr>
                      ))
                    }
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {files.map(item => (
                <div 
                  key={item.id} 
                  className="p-3 bg-vscode-editor border border-vscode-sidebar-border rounded flex flex-col items-center hover:bg-vscode-selection cursor-pointer"
                >
                  <div className="mb-2 text-3xl">{renderFileIcon(item)}</div>
                  <div className="text-center truncate w-full">
                    {item.name}
                  </div>
                  <div className="text-xs text-vscode-foreground/70 mt-1">
                    {item.size || (item.children ? `${item.children.length} items` : '--')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManagerModule;
