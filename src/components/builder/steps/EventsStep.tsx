"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Plus, Trash2, Calendar } from "lucide-react";
import { WeddingEvent } from "@/types";

const eventCategories = [
  { value: "wedding", label: "Wedding Ceremony" },
  { value: "engagement", label: "Engagement" },
  { value: "haldi", label: "Haldi" },
  { value: "mehendi", label: "Mehendi" },
  { value: "sangeet", label: "Sangeet" },
  { value: "reception", label: "Reception" },
];

const emptyEvent = (): WeddingEvent => ({
  id: Math.random().toString(36).slice(2),
  name: "Wedding Ceremony",
  category: "wedding",
  date: "",
  time: "10:00",
  venue_name: "",
  venue_address: "",
  venue_city: "",
  venue_maps_url: "",
});

export default function EventsStep() {
  const { invitation, updateInvitation } = useBuilderStore();
  const events = invitation.events ?? [];
  const [expandedId, setExpandedId] = useState<string | null>(events[0]?.id ?? null);

  const addEvent = () => {
    const newEvent = emptyEvent();
    updateInvitation({ events: [...events, newEvent] });
    setExpandedId(newEvent.id);
  };

  const updateEvent = (id: string, updates: Partial<WeddingEvent>) => {
    updateInvitation({
      events: events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const removeEvent = (id: string) => {
    updateInvitation({ events: events.filter((e) => e.id !== id) });
  };

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Wedding Events</h2>
        <p className="text-sm text-neutral-500">Add all the events guests should know about.</p>
      </div>

      <div className="space-y-3 mb-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">{event.name || "Untitled Event"}</p>
                  {event.date && (
                    <p className="text-xs text-neutral-400 mt-0.5">{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeEvent(event.id); }}
                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-400" />
                </button>
              </div>
            </button>

            {expandedId === event.id && (
              <div className="px-5 pb-5 space-y-4 border-t border-neutral-50">
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Select
                    label="Event Type"
                    options={eventCategories}
                    value={event.category}
                    onChange={(e) => updateEvent(event.id, { category: e.target.value as WeddingEvent["category"], name: eventCategories.find(c => c.value === e.target.value)?.label ?? event.name })}
                  />
                  <Input
                    label="Event Name"
                    value={event.name}
                    onChange={(e) => updateEvent(event.id, { name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    type="date"
                    value={event.date}
                    onChange={(e) => updateEvent(event.id, { date: e.target.value })}
                  />
                  <Input
                    label="Time"
                    type="time"
                    value={event.time}
                    onChange={(e) => updateEvent(event.id, { time: e.target.value })}
                  />
                </div>
                <Input
                  label="Venue Name"
                  placeholder="The Grand Palace"
                  value={event.venue_name}
                  onChange={(e) => updateEvent(event.id, { venue_name: e.target.value })}
                />
                <Input
                  label="Venue Address"
                  placeholder="MG Road, Jaipur"
                  value={event.venue_address}
                  onChange={(e) => updateEvent(event.id, { venue_address: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="Jaipur"
                    value={event.venue_city}
                    onChange={(e) => updateEvent(event.id, { venue_city: e.target.value })}
                  />
                  <Input
                    label="Google Maps URL"
                    placeholder="https://maps.google.com/..."
                    value={event.venue_maps_url ?? ""}
                    onChange={(e) => updateEvent(event.id, { venue_maps_url: e.target.value })}
                  />
                </div>
                <Input
                  label="Dress Code (optional)"
                  placeholder="Indian Formal"
                  value={event.dress_code ?? ""}
                  onChange={(e) => updateEvent(event.id, { dress_code: e.target.value })}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Button variant="secondary" onClick={addEvent} className="w-full">
        <Plus className="h-4 w-4" />
        Add Event
      </Button>
    </div>
  );
}
