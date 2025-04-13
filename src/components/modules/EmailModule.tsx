
import React from 'react';
import { Inbox, Send, Archive, Trash, Star, Mail, Search, Paperclip, BookmarkPlus } from 'lucide-react';

const EmailModule: React.FC = () => {
  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Mail className="mr-2" />
        Email Client
      </h2>
      
      <div className="grid grid-cols-4 gap-4 h-[calc(100%-64px)]">
        <div className="col-span-1 bg-vscode-sidebar rounded p-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Folders</h3>
            <button className="text-vscode-accent">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center p-2 bg-vscode-selection rounded">
              <Inbox className="w-4 h-4 mr-2" />
              <span>Inbox</span>
              <span className="ml-auto bg-vscode-accent rounded-full px-2 text-xs text-white">5</span>
            </div>
            <div className="flex items-center p-2 hover:bg-vscode-editor rounded">
              <Send className="w-4 h-4 mr-2" />
              <span>Sent</span>
            </div>
            <div className="flex items-center p-2 hover:bg-vscode-editor rounded">
              <Star className="w-4 h-4 mr-2" />
              <span>Starred</span>
            </div>
            <div className="flex items-center p-2 hover:bg-vscode-editor rounded">
              <Archive className="w-4 h-4 mr-2" />
              <span>Archive</span>
            </div>
            <div className="flex items-center p-2 hover:bg-vscode-editor rounded">
              <Trash className="w-4 h-4 mr-2" />
              <span>Trash</span>
            </div>
          </div>
        </div>
        
        <div className="col-span-3 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vscode-foreground/50" />
              <input 
                type="text" 
                placeholder="Search emails..."
                className="w-full bg-vscode-editor border border-vscode-sidebar-border rounded p-2 pl-10"
              />
            </div>
          </div>
          
          <div className="bg-vscode-editor border border-vscode-sidebar-border rounded flex-1 overflow-auto">
            <div className="border-b border-vscode-sidebar-border p-3 hover:bg-vscode-selection cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">Alice Johnson</div>
                <div className="text-xs text-vscode-foreground/70">10:23 AM</div>
              </div>
              <div className="font-medium">Project Update: New Features</div>
              <div className="text-sm text-vscode-foreground/70 truncate">
                Hi team, I wanted to share the latest updates on our project. We've implemented...
              </div>
              <div className="flex items-center mt-1 text-xs text-vscode-foreground/70">
                <Paperclip className="w-3 h-3 mr-1" />
                <span>2 attachments</span>
              </div>
            </div>
            
            <div className="border-b border-vscode-sidebar-border p-3 hover:bg-vscode-selection cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">Bob Smith</div>
                <div className="text-xs text-vscode-foreground/70">Yesterday</div>
              </div>
              <div className="font-medium">Meeting Agenda</div>
              <div className="text-sm text-vscode-foreground/70 truncate">
                Let's discuss the following items during our meeting tomorrow...
              </div>
            </div>
            
            <div className="border-b border-vscode-sidebar-border p-3 hover:bg-vscode-selection cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">Carol White</div>
                <div className="text-xs text-vscode-foreground/70">Apr 11</div>
              </div>
              <div className="font-medium">Design Review</div>
              <div className="text-sm text-vscode-foreground/70 truncate">
                The new design assets have been uploaded to the shared folder. Please review them...
              </div>
              <div className="flex items-center mt-1 text-xs text-vscode-foreground/70">
                <Paperclip className="w-3 h-3 mr-1" />
                <span>1 attachment</span>
              </div>
            </div>
            
            <div className="p-3 hover:bg-vscode-selection cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">David Lee</div>
                <div className="text-xs text-vscode-foreground/70">Apr 10</div>
              </div>
              <div className="font-medium">API Documentation</div>
              <div className="text-sm text-vscode-foreground/70 truncate">
                I've finished documenting the new API endpoints. You can find the documentation...
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="bg-vscode-accent text-white px-4 py-2 rounded flex items-center">
              <Mail className="mr-2 w-4 h-4" />
              Compose
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModule;
