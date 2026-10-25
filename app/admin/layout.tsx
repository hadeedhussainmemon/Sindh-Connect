"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  UserCheck, 
  Calendar, 
  Image as ImageIcon, 
  Mail, 
  LogOut, 
  Menu, 
  X, 
  Globe, 
  Clock, 
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { signOut } from "next-auth/react";

interface NavItem {
  name: string;
  href: string;
  tab: string;
}

function AdminNavList({ activeTab, onItemClick }: { activeTab: string; onItemClick?: () => void }) {
  const adminNavigation: NavItem[] = [
    { name: "Dashboard", href: "/admin", tab: "" },
    { name: "Sindhi Products", href: "/admin?tab=products", tab: "products" },
    { name: "Profiles (Luminaries)", href: "/admin?tab=personalities", tab: "personalities" },
    { name: "Pending Nominees", href: "/admin?tab=pending", tab: "pending" },
    { name: "Articles & Essays", href: "/admin?tab=articles", tab: "articles" },
    { name: "Events & Urs", href: "/admin?tab=events", tab: "events" },
    { name: "Heritage Gallery", href: "/admin?tab=gallery", tab: "gallery" },
    { name: "Subscribers", href: "/admin?tab=subscribers", tab: "subscribers" },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Dashboard": return LayoutDashboard;
      case "Sindhi Products": return ShoppingBag;
      case "Profiles (Luminaries)": return UserCheck;
      case "Pending Nominees": return Clock;
      case "Articles & Essays": return FileText;
      case "Events & Urs": return Calendar;
      case "Heritage Gallery": return ImageIcon;
      case "Subscribers": return Mail;
      default: return LayoutDashboard;
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {adminNavigation.map((item) => {
        const isActive = (item.tab === "" && activeTab === "") || (item.tab !== "" && activeTab === item.tab);
        const Icon = getIcon(item.name);
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onItemClick}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? "bg-maroon text-parchment shadow-sm font-bold"
                : "text-charcoal/80 hover:text-maroon hover:bg-parchment"
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-sand" : "text-maroon"}`} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

function AdminSidebarLinks({ onItemClick }: { onItemClick?: () => void }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "";
  return <AdminNavList activeTab={activeTab} onItemClick={onItemClick} />;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-parchment flex flex-col md:flex-row text-charcoal selection:bg-maroon selection:text-parchment">
      
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-maroon/15 bg-parchment/95 px-4 backdrop-blur-md md:hidden">
        <Link href="/admin" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Sindh Connect" className="h-7 w-7 object-contain" />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm text-indigo tracking-wider leading-none">
              SINDH CONNECT
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-maroon font-bold">
              Editorial CMS
            </span>
          </div>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg bg-ivory border border-maroon/20 text-maroon hover:bg-parchment"
          aria-label="Open CMS Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile Nav Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs md:hidden flex justify-start animate-fadeIn">
          <div className="w-72 bg-ivory border-r border-maroon/20 p-5 flex flex-col h-full overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-maroon/15">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Sindh Connect" className="h-6 w-6 object-contain" />
                <span className="font-display font-bold text-indigo text-xs tracking-wider">
                  SINDH CONNECT CMS
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded text-charcoal/70 hover:bg-parchment"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-grow flex flex-col gap-1">
              <Suspense fallback={<div className="h-40 animate-pulse bg-parchment rounded-xl" />}>
                <AdminSidebarLinks onItemClick={() => setIsMobileMenuOpen(false)} />
              </Suspense>
            </div>

            <div className="pt-3 border-t border-maroon/15 flex flex-col gap-2">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-maroon/20 text-xs font-bold text-indigo hover:text-maroon bg-parchment"
              >
                <Globe className="h-3.5 w-3.5 text-maroon" /> View Website
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-maroon hover:bg-maroon/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </div>
          </div>
          <div className="flex-grow" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Desktop Permanent Sidebar Nav */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:border-r md:border-maroon/15 md:bg-ivory p-5 z-20">
        <Link href="/admin" className="flex items-center gap-3 pb-5 border-b border-maroon/15 mb-5 group">
          <div className="h-10 w-10 rounded-xl bg-parchment border border-maroon/20 p-1 flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Sindh Connect" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm text-indigo tracking-wider leading-tight">
              SINDH CONNECT
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-maroon font-bold">
              Editorial CMS
            </span>
          </div>
        </Link>

        <nav className="flex-grow flex flex-col gap-1 overflow-y-auto">
          <Suspense fallback={<div className="h-40 animate-pulse bg-parchment rounded-xl" />}>
            <AdminSidebarLinks />
          </Suspense>
        </nav>

        <div className="pt-4 border-t border-maroon/15 flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-maroon/20 text-xs font-bold text-indigo hover:text-maroon hover:bg-parchment bg-parchment/60 transition-all"
          >
            <Globe className="h-3.5 w-3.5 text-maroon" /> View Website
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-maroon hover:bg-maroon/10 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main CMS view wrapper */}
      <main className="flex-grow md:pl-64 flex flex-col min-h-screen">
        <div className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
