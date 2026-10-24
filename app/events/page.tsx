"use client";

import { useState, useEffect } from "react";
import { Calendar, Loader2, MapPin, Sparkles } from "lucide-react";

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
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12 border-b border-[#801020]/40 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#801020]/25 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] mb-3">
          <Calendar className="h-3.5 w-3.5" />
          ثقافتي ميڙا ۽ محفلون
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white mb-3">
          Cultural Events & Festivals of Sindh
        </h1>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto">
          Tracking the annual Urs Mubarak of Sufi saints, Sindh Cultural Day, Lahooti Melo, and literary conferences.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 text-[#d4af37] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Upcoming */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#d4af37] border-b border-[#801020]/40 pb-2 flex items-center justify-between">
              <span>Upcoming Festivals</span>
              <span className="text-xs bg-[#801020]/30 px-2.5 py-0.5 rounded text-[#f4ede2] font-mono">
                {upcomingEvents.length} Events
              </span>
            </h2>
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-neutral-500 text-sm">No upcoming events scheduled right now.</p>
              ) : upcomingEvents.map((e) => (
                <div key={e._id} className="p-6 rounded-2xl border border-[#801020]/50 bg-[#12070a] hover:border-[#d4af37]/60 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#d4af37] font-bold flex items-center gap-1.5 bg-[#801020]/25 px-2.5 py-1 rounded border border-[#801020]/50">
                      <Calendar className="h-3.5 w-3.5" /> 
                      {new Date(e.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Upcoming
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg leading-snug">{e.title}</h3>
                  {e.location && (
                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#d4af37]" /> {e.location}
                    </p>
                  )}
                  {e.description && (
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Past */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-300 border-b border-[#801020]/40 pb-2">
              Past Archives
            </h2>
            <div className="space-y-4">
              {pastEvents.length === 0 ? (
                <p className="text-neutral-500 text-sm">No past records found.</p>
              ) : pastEvents.map((e) => (
                <div key={e._id} className="p-6 rounded-2xl border border-[#801020]/30 bg-[#12070a]/60 opacity-80 hover:opacity-100 transition-all space-y-2">
                  <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> 
                    {new Date(e.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <h3 className="font-bold text-white text-base leading-snug">{e.title}</h3>
                  {e.location && (
                    <p className="text-xs text-neutral-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {e.location}
                    </p>
                  )}
                  {e.description && (
                    <p className="text-xs text-neutral-400 font-light">{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
