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
        <div className="flex-row">
          <button className="glass-panel" style={{ padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s ease" }}>🔔</button>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#4f46e5", border: "2px solid rgba(255,255,255,0.2)" }}></div>
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
        
        <div className="glass-panel" style={{ background: "rgba(239, 68, 68, 0.05)", borderLeft: "4px solid var(--danger-color)" }}>
          <div className="flex-row justify-between text-danger" style={{ marginBottom: 16 }}>
            <span className="font-bold text-sm">UPCOMING ALERT</span>
            <span>🚨</span>
          </div>
          <h3 className="text-xl font-bold">Amlodipine 10mg</h3>
          <p className="text-sm text-danger" style={{ marginTop: 8 }}>Due in 45 mins • Needs confirmation</p>
          <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', marginTop: '16px' }}>
             <button className="btn-primary" style={{ background: "var(--danger-color)", boxShadow: "none" }}>Confirm Meds</button>
          </div>
        </div>
      </section>

      {/* Content Details */}
      <section className="grid-2 animate-fade-in delay-2">
        {/* Calendar Widget */}
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="text-lg font-bold" style={{ marginBottom: 24 }}>Today's Care Plan</h3>
          <div className="flex-col" style={{ gap: 16 }}>
             <div style={{ padding: 16, borderLeft: "4px solid var(--success-color)", background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                <p className="font-medium">Morning Check-in Call</p>
                <p className="text-xs text-muted" style={{ marginTop: 4 }}>9:00 AM • Completed</p>
             </div>
             <div style={{ padding: 16, borderLeft: "4px solid var(--warning-color)", background: "rgba(255,255,255,0.05)", borderRadius: 12 }}>
                <div className="flex-row justify-between">
                   <p className="font-medium">Blood Pressure Meds</p>
                   <span className="text-xs" style={{ padding: "2px 8px", background: "rgba(245, 158, 11, 0.1)", color: "var(--warning-color)", borderRadius: 12, fontWeight: 500 }}>Pending</span>
                </div>
                <p className="text-xs text-muted" style={{ marginTop: 4 }}>12:00 PM • Upcoming</p>
             </div>
             <div style={{ padding: 16, borderLeft: "4px solid var(--accent-color)", background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                <p className="font-medium">Physical Therapy Visit</p>
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
          <div className="flex-col" style={{ gap: 16 }}>
              <div className="flex-row justify-between" style={{ padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.03)" }}>
                 <div className="flex-row">
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👩‍⚕️</div>
                    <div>
                       <p className="font-medium text-sm">Dr. Sarah Jenkins</p>
                       <p className="text-xs text-muted" style={{ marginTop: 2 }}>Geriatric Nurse • ⭐ 4.9</p>
                    </div>
                 </div>
                 <button className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem", borderRadius: 8 }}>Book</button>
              </div>
              <div className="flex-row justify-between" style={{ padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.03)" }}>
                 <div className="flex-row">
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💰</div>
                    <div>
                       <p className="font-medium text-sm">Elder Financial Pros</p>
                       <p className="text-xs text-muted" style={{ marginTop: 2 }}>Wealth Mgmt • ⭐ 4.7</p>
                    </div>
                 </div>
                 <button className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem", borderRadius: 8 }}>Book</button>
              </div>
              
              <div className="flex-row justify-between" style={{ padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.03)" }}>
                 <div className="flex-row">
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🚕</div>
                    <div>
                       <p className="font-medium text-sm">CareRide Transport</p>
                       <p className="text-xs text-muted" style={{ marginTop: 2 }}>Medical Transit • ⭐ 4.8</p>
                    </div>
                 </div>
                 <button className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem", borderRadius: 8 }}>Book</button>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}
