'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
  const pathname = usePathname();
  
  if (pathname === '/login' || pathname === '/register') return null;

  return (
    <aside className="sidebar">
      <div className="flex-row" style={{ marginBottom: "40px" }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--accent-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 20 }}>
          CB
        </div>
        <h2 className="text-xl font-bold">CareBridge</h2>
      </div>
      
      <nav className="flex-col" style={{ gap: "4px" }}>
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          <span style={{ fontSize: 18 }}>📊</span> Dashboard
        </Link>
        <Link href="/care-plan" className={`nav-link ${pathname === '/care-plan' ? 'active' : ''}`}>
          <span style={{ fontSize: 18 }}>📅</span> Care Plan
        </Link>
        <Link href="/services" className={`nav-link ${pathname === '/services' ? 'active' : ''}`}>
          <span style={{ fontSize: 18 }}>🏥</span> Services
        </Link>
        <Link href="/settings" className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}>
          <span style={{ fontSize: 18 }}>⚙️</span> Settings
        </Link>
      </nav>
      
      <div style={{ margin: "24px 0", height: "1px", background: "rgba(0,0,0,0.05)" }}></div>

      <button className="btn-primary" style={{ background: "#ef4444", color: "white", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", border: "none", padding: "12px" }}>
         <span style={{ fontSize: 18 }}>🚨</span> SOS Emergency
      </button>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Support Box */}
        <div style={{ padding: "16px", background: "rgba(37, 211, 102, 0.03)", borderRadius: "16px", border: "1px solid rgba(37, 211, 102, 0.15)" }}>
           <p className="text-xs font-bold" style={{ color: "#128c7e", marginBottom: 4, letterSpacing: "0.05em" }}>CARE CONCIERGE</p>
           <p className="text-sm font-medium" style={{ opacity: 0.8 }}>Need help with Dad?</p>
           <button style={{ marginTop: 12, width: "100%", padding: "10px", borderRadius: "10px", background: "#25D366", color: "white", border: "none", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "transform 0.1s" }}>
              <span>💬</span> WhatsApp Agent
           </button>
        </div>

        {/* Logout at the very bottom, clearly styled */}
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "12px",
            background: "rgba(0,0,0,0.02)",
            border: "1px solid rgba(0,0,0,0.05)",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "500",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
            e.currentTarget.style.color = "#ef4444";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.02)";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
          }}
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
