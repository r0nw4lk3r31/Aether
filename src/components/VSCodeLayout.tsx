
import React, { useState } from 'react';
import ActivityBar from './ActivityBar';
import SideBar from './SideBar';
import EditorArea from './EditorArea';
import StatusBar from './StatusBar';
import TitleBar from './TitleBar';
import AIPanel from './AIPanel';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Module = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export type TabItem = {
  id: string;
  title: string;
  content: React.ReactNode;
  moduleId: string;
  isDirty?: boolean;
  isPinned?: boolean;
  isDetachable?: boolean;
  isDetached?: boolean;
};

const VSCodeLayout: React.FC = () => {
  // Active sidebar view (explorer, search, git, etc.)
  const [activeView, setActiveView] = useState('explorer');
  
  // Track if sidebar is visible
  const [sidebarVisible, setSidebarVisible] = useState(true);
  
  // Track if AI panel is visible
  const [aiPanelVisible, setAiPanelVisible] = useState(false);
  
  // State for tabs
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  
  // State for detached tabs (simulated floating windows)
  const [detachedTabs, setDetachedTabs] = useState<TabItem[]>([]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Toggle AI panel visibility
  const toggleAIPanel = () => {
    setAiPanelVisible(!aiPanelVisible);
  };

  // Open a new tab
  const openTab = (tab: TabItem) => {
    // Check if tab is already open
    const existingTabIndex = tabs.findIndex(t => t.id === tab.id);
    
    if (existingTabIndex >= 0) {
      // If already open, just activate it
      setActiveTabId(tab.id);
    } else {
      // Otherwise add new tab
      setTabs([...tabs, tab]);
      setActiveTabId(tab.id);
    }
  };

  // Close a tab
  const closeTab = (tabId: string) => {
    setTabs(tabs.filter(tab => tab.id !== tabId));
    
    // If we closed the active tab, activate another one if available
    if (activeTabId === tabId && tabs.length > 1) {
      const tabIndex = tabs.findIndex(tab => tab.id === tabId);
      const newActiveTab = tabs[tabIndex === 0 ? 1 : tabIndex - 1];
      setActiveTabId(newActiveTab.id);
    } else if (tabs.length <= 1) {
      setActiveTabId(null);
    }
  };

  // Detach a tab to create a "floating window"
  const detachTab = (tabId: string) => {
    const tabToDetach = tabs.find(tab => tab.id === tabId);
    if (!tabToDetach) return;
    
    // Remove from tabs and add to detached tabs
    setTabs(tabs.filter(tab => tab.id !== tabId));
    setDetachedTabs([...detachedTabs, {...tabToDetach, isDetached: true}]);
    
    // Update active tab if necessary
    if (activeTabId === tabId) {
      setActiveTabId(tabs.length > 1 ? tabs[0].id : null);
    }
  };

  // Re-attach a detached tab
  const reattachTab = (tabId: string) => {
    const tabToReattach = detachedTabs.find(tab => tab.id === tabId);
    if (!tabToReattach) return;
    
    // Remove from detached tabs and add back to tabs
    setDetachedTabs(detachedTabs.filter(tab => tab.id !== tabId));
    setTabs([...tabs, {...tabToReattach, isDetached: false}]);
    setActiveTabId(tabToReattach.id);
  };

  return (
    <div className="h-screen flex flex-col text-sm">
      <TitleBar />
      
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          toggleSidebar={toggleSidebar} 
          toggleAIPanel={toggleAIPanel}
          aiPanelVisible={aiPanelVisible}
        />
        
        {sidebarVisible && (
          <SideBar 
            activeView={activeView} 
            openTab={openTab} 
          />
        )}
        
        <div className="flex flex-col flex-1">
          <div className="vs-editor-tabs bg-vscode-editor border-b border-vscode-sidebar-border">
            <Tabs value={activeTabId || ""} className="w-full">
              <TabsList className="h-9 bg-transparent gap-0 rounded-none">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`px-3 h-9 rounded-none data-[state=active]:bg-vscode-tab-active data-[state=active]:border-b-2 data-[state=active]:border-vscode-accent bg-vscode-tab-inactive group relative`}
                    onClick={() => setActiveTabId(tab.id)}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{tab.title}</span>
                      <div className="invisible group-hover:visible flex gap-0.5">
                        {tab.isDetachable && (
                          <button 
                            className="hover:bg-vscode-selection rounded p-0.5" 
                            onClick={(e) => {
                              e.stopPropagation();
                              detachTab(tab.id);
                            }}
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M7 17L17 7M7 7h10v10" />
                            </svg>
                          </button>
                        )}
                        <button 
                          className="hover:bg-vscode-selection rounded p-0.5" 
                          onClick={(e) => {
                            e.stopPropagation();
                            closeTab(tab.id);
                          }}
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            <EditorArea 
              activeTabId={activeTabId}
              tabs={tabs}
            />
            
            {aiPanelVisible && (
              <AIPanel 
                isVisible={aiPanelVisible}
                toggleVisibility={toggleAIPanel}
              />
            )}
          </div>
        </div>
      </div>
      
      <StatusBar />
      
      {/* Detached Tabs (floating windows) */}
      {detachedTabs.map((tab) => (
        <div 
          key={tab.id}
          className="fixed top-40 left-40 w-[500px] h-[400px] bg-vscode-background border border-vscode-sidebar-border shadow-lg flex flex-col rounded overflow-hidden z-50"
          style={{ resize: 'both' }}
        >
          <div className="vs-titlebar flex justify-between cursor-move">
            <div className="px-2 py-1">{tab.title}</div>
            <div className="flex">
              <button 
                className="px-2 hover:bg-vscode-selection"
                onClick={() => reattachTab(tab.id)}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 17L7 7M17 7H7v10" />
                </svg>
              </button>
              <button 
                className="px-2 hover:bg-destructive"
                onClick={() => setDetachedTabs(detachedTabs.filter(t => t.id !== tab.id))}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {tab.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VSCodeLayout;
