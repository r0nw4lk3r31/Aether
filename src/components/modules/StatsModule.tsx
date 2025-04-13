
import React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, CheckCircle2, Clock, HardDrive, Server, FileClock } from 'lucide-react';

const data = [
  { name: 'Jan', value: 40, issues: 24, resolved: 18 },
  { name: 'Feb', value: 30, issues: 13, resolved: 22 },
  { name: 'Mar', value: 20, issues: 8, resolved: 12 },
  { name: 'Apr', value: 27, issues: 18, resolved: 8 },
  { name: 'May', value: 18, issues: 12, resolved: 15 },
  { name: 'Jun', value: 23, issues: 14, resolved: 10 },
  { name: 'Jul', value: 34, issues: 5, resolved: 12 },
];

const StatsModule: React.FC = () => {
  return (
    <div className="p-4 h-full overflow-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Activity className="mr-2" />
        Project Statistics
      </h2>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-vscode-foreground/70">Open Issues</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-semibold">12</span>
            <span className="ml-2 text-sm text-red-500">+3</span>
          </div>
        </div>
        
        <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-vscode-foreground/70">Closed Issues</h3>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-semibold">47</span>
            <span className="ml-2 text-sm text-green-500">+8</span>
          </div>
        </div>
        
        <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-vscode-foreground/70">Disk Space</h3>
            <HardDrive className="w-5 h-5 text-vscode-accent" />
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-semibold">64%</span>
            <span className="ml-2 text-xs text-vscode-foreground/70">183.4 GB / 256 GB</span>
          </div>
        </div>
        
        <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-vscode-foreground/70">Uptime</h3>
            <Clock className="w-5 h-5 text-vscode-accent" />
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-semibold">99.8%</span>
            <span className="ml-2 text-xs text-vscode-foreground/70">30 days</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4">Project Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#252526', 
                    borderColor: '#333',
                    color: '#eee'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#007ACC" 
                  fill="#007ACC" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4">Issues Tracker</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#252526', 
                    borderColor: '#333',
                    color: '#eee'
                  }} 
                />
                <Legend />
                <Bar dataKey="issues" fill="#FF6B6B" />
                <Bar dataKey="resolved" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4 col-span-2">
          <h3 className="text-sm font-medium mb-4">API Health</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#252526', 
                    borderColor: '#333',
                    color: '#eee'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4CAF50" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4">System Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="w-full bg-vscode-sidebar rounded-full h-2">
                <div className="bg-vscode-accent h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Memory</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="w-full bg-vscode-sidebar rounded-full h-2">
                <div className="bg-vscode-accent h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Network</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-vscode-sidebar rounded-full h-2">
                <div className="bg-vscode-accent h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-vscode-sidebar-border">
            <div className="flex items-center space-x-1 text-green-500 mb-2">
              <Server className="w-4 h-4" />
              <span className="text-sm font-medium">All Systems Operational</span>
            </div>
            <div className="text-xs text-vscode-foreground/70">
              Last checked: 5 minutes ago
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-vscode-editor border border-vscode-sidebar-border rounded-lg p-4 mb-4">
        <h3 className="text-sm font-medium mb-4 flex items-center">
          <FileClock className="w-4 h-4 mr-2" />
          Module Status
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-vscode-sidebar-border">
              <th className="pb-2">Module</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Last Activity</th>
              <th className="pb-2">Health</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-vscode-sidebar-border">
              <td className="py-3">Agenda</td>
              <td><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Active</span></td>
              <td>10 minutes ago</td>
              <td>
                <div className="w-20 bg-vscode-sidebar rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-vscode-sidebar-border">
              <td className="py-3">Todo</td>
              <td><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Active</span></td>
              <td>25 minutes ago</td>
              <td>
                <div className="w-20 bg-vscode-sidebar rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-vscode-sidebar-border">
              <td className="py-3">Email</td>
              <td><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Active</span></td>
              <td>1 hour ago</td>
              <td>
                <div className="w-20 bg-vscode-sidebar rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-vscode-sidebar-border">
              <td className="py-3">File Manager</td>
              <td><span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs">Idle</span></td>
              <td>3 hours ago</td>
              <td>
                <div className="w-20 bg-vscode-sidebar rounded-full h-1.5">
                  <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-3">Telegram Bot</td>
              <td><span className="px-2 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">Error</span></td>
              <td>2 days ago</td>
              <td>
                <div className="w-20 bg-vscode-sidebar rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsModule;
