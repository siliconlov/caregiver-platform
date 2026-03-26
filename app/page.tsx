import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import VitalsChart from './components/VitalsChart';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <main className="main-content">
      {/* Header */}
      <header className="flex-row justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Dad's Care Dashboard</h1>
          <p className="text-muted" style={{ marginTop: 8 }}>Vitals and tasks are stable today. (Caregiver: {session.user?.name?.split(' ')[0]})</p>
        </div>
        <div className="flex-row" style={{ gap: 12 }}>
          <button className="glass-panel" style={{ width: 44, height: 44, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px", border: "1px solid var(--panel-border)", background: "white", cursor: "pointer", fontSize: 20 }}>🔔</button>
          <div style={{ width: 44, height: 44, borderRadius: "14px", background: "linear-gradient(135deg, var(--accent-color) 0%, #4338ca 100%)", border: "2px solid white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>
             {session.user?.name?.[0] || 'P'}
          </div>
        </div>
      </header>

      {/* Top Cards */}
      <section className="grid-3 animate-fade-in delay-1">
        <div className="glass-panel">
          <div className="flex-row justify-between text-muted" style={{ marginBottom: 16 }}>
            <span className="font-medium text-sm">Movement</span>
            <span>⌚</span>
          </div>
          <h3 className="text-xl font-medium">Apple Watch Sync</h3>
          <p className="text-sm text-success" style={{ marginTop: 8 }}>Active 5 mins ago</p>
          <VitalsChart data={[20, 45, 30, 80, 50, 90, 75]} color="#10b981" label="movement" />
        </div>
        
        <div className="glass-panel" style={{ background: "linear-gradient(135deg, rgba(239, 68, 68, 0.02) 0%, rgba(239, 68, 68, 0.08) 100%)", borderLeft: "4px solid var(--danger-color)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="flex-row justify-between" style={{ marginBottom: 12 }}>
              <span className="text-danger font-bold text-xs" style={{ letterSpacing: "0.05em" }}>UPCOMING ALERT</span>
              <span style={{ fontSize: 18 }}>🚨</span>
            </div>
            <h3 className="text-xl font-bold" style={{ color: "#991b1b" }}>Amlodipine 10mg</h3>
            <p className="text-sm" style={{ color: "#b91c1c", marginTop: 4, opacity: 0.8 }}>Due in 45 mins • Needs confirmation</p>
          </div>
          <button className="btn-primary" style={{ background: "var(--danger-color)", width: "100%", marginTop: 20, boxShadow: "0 4px 15px rgba(239, 68, 68, 0.2)" }}>Confirm Meds</button>
        </div>
      </section>

      {/* Content Details */}
      <section className="grid-2 animate-fade-in delay-2">
        {/* Calendar Widget */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="text-lg font-bold" style={{ marginBottom: 24 }}>Today's Care Plan</h3>
          <div className="flex-col" style={{ gap: 12 }}>
             <div style={{ padding: "16px 20px", borderLeft: "4px solid var(--success-color)", background: "rgba(16, 185, 129, 0.03)", borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p className="font-bold" style={{ fontSize: "0.95rem" }}>Morning Check-in Call</p>
                  <p className="text-xs text-muted" style={{ marginTop: 4 }}>9:00 AM • Completed</p>
                </div>
                <span style={{ fontSize: 20 }}>✅</span>
             </div>
             <div style={{ padding: "16px 20px", borderLeft: "4px solid var(--warning-color)", background: "rgba(245, 158, 11, 0.03)", borderRadius: 16 }}>
                <div className="flex-row justify-between">
                   <p className="font-bold" style={{ fontSize: "0.95rem" }}>Blood Pressure Meds</p>
                   <span className="text-xs" style={{ padding: "4px 10px", background: "rgba(245, 158, 11, 0.1)", color: "var(--warning-color)", borderRadius: 20, fontWeight: 600 }}>12:00 PM</span>
                </div>
                <p className="text-xs text-muted" style={{ marginTop: 6 }}>Status: Pending Confirmation</p>
             </div>
             <div style={{ padding: "16px 20px", borderLeft: "4px solid var(--accent-color)", background: "rgba(99, 102, 241, 0.03)", borderRadius: 16 }}>
                <p className="font-bold" style={{ fontSize: "0.95rem" }}>Physical Therapy Visit</p>
                <p className="text-xs text-muted" style={{ marginTop: 4 }}>3:30 PM • Dr. Emily</p>
             </div>
          </div>
        </div>

        {/* Recommended Services Marketplace Snippet */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column" }}>
          <div className="flex-row justify-between" style={{ marginBottom: 24 }}>
             <h3 className="text-lg font-bold">Recommended Partners</h3>
             <button className="text-sm text-accent-color" style={{ background: "transparent", border: "none", cursor: "pointer", fontWeight: 500 }}>View All</button>
          </div>
          <div className="flex-col" style={{ gap: 12 }}>
              {[
                { name: "Dr. Sarah Jenkins", role: "Geriatric Nurse", rating: "4.9", emoji: "👩‍⚕️", color: "#8b5cf6" },
                { name: "Elder Financial Pros", role: "Wealth Mgmt", rating: "4.7", emoji: "💰", color: "#10b981" },
                { name: "CareRide Transport", role: "Medical Transit", rating: "4.8", emoji: "🚕", color: "#f59e0b" }
              ].map((partner, idx) => (
                <div key={idx} className="flex-row justify-between" style={{ padding: "14px", background: "rgba(0,0,0,0.015)", borderRadius: 16, border: "1px solid rgba(0,0,0,0.03)" }}>
                  <div className="flex-row" style={{ gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: partner.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{partner.emoji}</div>
                    <div>
                        <p className="font-bold text-sm">{partner.name}</p>
                        <p className="text-xs text-muted" style={{ marginTop: 2 }}>{partner.role} • ⭐ {partner.rating}</p>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.8rem", borderRadius: 10, background: "white", color: "var(--accent-color)", border: "1px solid var(--accent-color)", boxShadow: "none" }}>Book</button>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
