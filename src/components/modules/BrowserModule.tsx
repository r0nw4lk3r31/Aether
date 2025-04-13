
import React, { useState } from 'react';
import { Globe, Search, ChevronLeft, ChevronRight, RefreshCw, Home, Bookmark, MoreHorizontal, Plus } from 'lucide-react';

const BrowserModule: React.FC = () => {
  const [url, setUrl] = useState('https://www.example.com');
  const [bookmarks, setBookmarks] = useState([
    { id: '1', title: 'Google', url: 'https://www.google.com' },
    { id: '2', title: 'GitHub', url: 'https://github.com' },
    { id: '3', title: 'Stack Overflow', url: 'https://stackoverflow.com' }
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 bg-vscode-sidebar border-b border-vscode-sidebar-border">
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded hover:bg-vscode-selection">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-1 rounded hover:bg-vscode-selection">
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="p-1 rounded hover:bg-vscode-selection">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-1 rounded hover:bg-vscode-selection">
            <Home className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vscode-foreground/50" />
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-vscode-editor border border-vscode-sidebar-border rounded p-2 pl-10"
            />
          </div>
          
          <button className="p-1 rounded hover:bg-vscode-selection" title="Add Bookmark">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-1 rounded hover:bg-vscode-selection" title="More Options">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex mt-2 border-t border-vscode-sidebar-border pt-2">
          {bookmarks.map((bookmark) => (
            <div 
              key={bookmark.id}
              className="px-3 py-1 rounded hover:bg-vscode-selection cursor-pointer text-sm flex items-center"
              onClick={() => setUrl(bookmark.url)}
            >
              <Globe className="w-3 h-3 mr-1" />
              {bookmark.title}
            </div>
          ))}
          <button className="px-2 py-1 hover:bg-vscode-selection rounded text-vscode-foreground/70">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="text-center text-gray-800">
          <Globe className="w-16 h-16 mx-auto mb-4 text-vscode-accent" />
          <h3 className="text-xl font-semibold mb-2">Browser Content</h3>
          <p className="text-sm">Preview of embedded browser window</p>
          <p className="text-xs mt-4 text-gray-500">{url}</p>
        </div>
      </div>
    </div>
  );
};

export default BrowserModule;
