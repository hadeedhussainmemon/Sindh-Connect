"use client";

import { useState, useEffect } from "react";
import { Calendar, Loader2, MapPin } from "lucide-react";

interface EventData {
  _id: string;
  title: string;
  date: string;
  description?: string;
  location?: string;
  status: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter(e => e.status === "upcoming" && new Date(e.date).getTime() >= today);
  const pastEvents = events.filter(e => e.status === "past" || new Date(e.date).getTime() < today);

  return (
    <div className="w-full min-h-screen bg-[#FAF6EF] text-[#202426]">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 border-b border-[#702B35]/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#702B35]/10 border border-[#702B35]/30 text-xs font-mono font-bold text-[#702B35] mb-3">
            <Calendar className="h-3.5 w-3.5" />
            <span>ثقافتي ميڙا ۽ محفلون</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#173C50] mb-3">
            Cultural Events &amp; Festivals of Sindh
          </h1>
          <p className="text-[#202426]/80 text-sm sm:text-base font-serif max-w-xl mx-auto leading-relaxed">
            Tracking the annual Urs Mubarak of Sufi saints, Sindh Cultural Day, Lahooti Melo, and literary conferences.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-[#702B35] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Upcoming Events */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#173C50] border-b border-[#702B35]/20 pb-2 flex items-center justify-between">
                <span>Upcoming Festivals</span>
                <span className="text-xs bg-[#702B35] px-2.5 py-0.5 rounded text-[#FAF6EF] font-mono">
                  {upcomingEvents.length} Events
                </span>
              </h2>
              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <p className="text-[#202426]/60 text-sm font-serif">No upcoming events scheduled right now.</p>
                ) : upcomingEvents.map((e) => (
                  <div key={e._id} className="p-6 rounded-2xl border border-[#702B35]/20 bg-[#F4EEE2] hover:border-[#702B35]/50 transition-all space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#702B35] font-bold flex items-center gap-1.5 bg-[#FAF6EF] px-2.5 py-1 rounded border border-[#702B35]/20 font-mono">
                        <Calendar className="h-3.5 w-3.5" /> 
                        {new Date(e.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#173C50] bg-[#FAF6EF] border border-[#173C50]/20 px-2 py-0.5 rounded font-mono">
                        Upcoming
                      </span>
                    </div>
                    <h3 className="font-bold text-[#173C50] text-lg leading-snug">{e.title}</h3>
                    {e.location && (
                      <p className="text-xs text-[#202426]/75 flex items-center gap-1 font-serif">
                        <MapPin className="h-3.5 w-3.5 text-[#702B35]" /> {e.location}
                      </p>
                    )}
                    {e.description && (
                      <p className="text-xs text-[#202426]/70 leading-relaxed font-serif">
                        {e.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Past Gatherings */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#702B35] border-b border-[#702B35]/20 pb-2 flex items-center justify-between">
                <span>Past Gatherings</span>
                <span className="text-xs bg-[#F4EEE2] border border-[#702B35]/20 px-2.5 py-0.5 rounded text-[#202426] font-mono">
                  {pastEvents.length} Recorded
                </span>
              </h2>
              <div className="space-y-4">
                {pastEvents.length === 0 ? (
                  <p className="text-[#202426]/60 text-sm font-serif">No past events recorded.</p>
                ) : pastEvents.map((e) => (
                  <div key={e._id} className="p-5 rounded-2xl border border-[#702B35]/15 bg-[#FAF6EF] opacity-90 space-y-2">
                    <span className="text-xs text-[#702B35] font-mono font-medium block">
                      {new Date(e.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <h3 className="font-bold text-[#173C50] text-base">{e.title}</h3>
                    {e.location && (
                      <p className="text-xs text-[#202426]/60 flex items-center gap-1 font-serif">
                        <MapPin className="h-3 w-3 text-[#702B35]" /> {e.location}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
