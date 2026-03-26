'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
      
      <nav className="flex-col">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          <span style={{ fontSize: 20 }}>📊</span> Dashboard
        </Link>
        <Link href="/care-plan" className={`nav-link ${pathname === '/care-plan' ? 'active' : ''}`}>
          <span style={{ fontSize: 20 }}>📅</span> Care Plan
        </Link>
        <Link href="/services" className={`nav-link ${pathname === '/services' ? 'active' : ''}`}>
          <span style={{ fontSize: 20 }}>🏥</span> Services
        </Link>
        <Link href="/settings" className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}>
          <span style={{ fontSize: 20 }}>⚙️</span> Settings
        </Link>
      </nav>

      <button className="btn-primary" style={{ marginTop: "24px", background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)", display: "flex", justifyContent: "center", gap: "10px" }}>
         <span style={{ fontSize: 18 }}>🚨</span> SOS Emergency
      </button>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="glass-panel" style={{ padding: "16px", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
           <p className="text-xs font-bold" style={{ color: "var(--success-color)", marginBottom: 4 }}>CARE CONCIERGE</p>
           <p className="text-sm font-medium">Need help with Dad's care?</p>
           <button style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: "8px", background: "#25D366", color: "white", border: "none", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span>💬</span> WhatsApp Agent
           </button>
        </div>

        <div className="glass-panel text-center">
          <p className="text-sm font-medium">CareBridge Pro</p>
          <p className="text-xs text-muted" style={{ marginTop: 4, marginBottom: 12 }}>WhatsApp Alerts & Spiritual/Social Events</p>
          <button className="btn-primary" style={{ width: "100%", padding: "10px" }}>Go Pro</button>
        </div>
      </div>
    </aside>
  );
}
