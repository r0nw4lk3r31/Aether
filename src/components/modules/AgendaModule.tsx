
import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
}

const AgendaModule: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Team Meeting', date: '2025-04-14', time: '10:00' },
    { id: '2', title: 'Client Call', date: '2025-04-15', time: '14:30' },
    { id: '3', title: 'Project Deadline', date: '2025-04-16', time: '18:00' }
  ]);
  
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, { 
        id: Date.now().toString(), 
        ...newEvent 
      }]);
      setNewEvent({ title: '', date: '', time: '' });
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calendar className="mr-2" />
        Agenda
      </h2>
      
      <div className="mb-6 bg-vscode-sidebar p-4 rounded">
        <h3 className="text-sm font-semibold mb-2">Add New Event</h3>
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            placeholder="Event Title"
            className="bg-vscode-editor border border-vscode-sidebar-border rounded p-2"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="bg-vscode-editor border border-vscode-sidebar-border rounded p-2"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            />
            <input
              type="time"
              className="bg-vscode-editor border border-vscode-sidebar-border rounded p-2"
              value={newEvent.time}
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
            />
          </div>
          <button 
            className="bg-vscode-accent text-white p-2 rounded flex items-center justify-center"
            onClick={addEvent}
          >
            <Plus className="mr-1 w-4 h-4" /> Add Event
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Upcoming Events</h3>
        {events.length === 0 ? (
          <div className="text-vscode-foreground/50 text-center p-4">
            No events scheduled
          </div>
        ) : (
          <div className="space-y-2">
            {events.map(event => (
              <div 
                key={event.id} 
                className="flex items-center justify-between bg-vscode-editor border border-vscode-sidebar-border rounded p-3"
              >
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-vscode-foreground/70 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> {event.date} 
                    <Clock className="w-3 h-3 ml-2 mr-1" /> {event.time}
                  </div>
                </div>
                <button 
                  className="text-vscode-foreground/70 hover:text-destructive"
                  onClick={() => deleteEvent(event.id)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-6 text-xs text-vscode-foreground/50 border-t border-vscode-sidebar-border pt-4">
        <p>Note: Google Calendar integration can be set up in the Settings.</p>
      </div>
    </div>
  );
};

export default AgendaModule;
