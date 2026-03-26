import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function ServicesMarketplace() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <main className="main-content">
      <header className="flex-row justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Services Marketplace</h1>
          <p className="text-muted" style={{ marginTop: 8 }}>Find and book vetted local professionals in your parent's city.</p>
        </div>
        
        <div className="flex-row">
            <input type="text" placeholder="Search services..." style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none", width: 250 }} />
            <button className="btn-primary">Filter</button>
        </div>
      </header>

      {/* Categories */}
      <section className="flex-row animate-fade-in delay-1" style={{ marginTop: 24, gap: 16, flexWrap: "wrap" }}>
          <button className="glass-panel" style={{ padding: "10px 24px", borderRadius: 20, background: "var(--accent-color)", border: "1px solid var(--accent-color)", color: "white", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)" }}>All</button>
          <button className="glass-panel" style={{ padding: "10px 24px", borderRadius: 20, background: "white", border: "1px solid var(--panel-border)", color: "var(--text-secondary)", fontWeight: 500, cursor: "pointer", transition: "var(--transition)" }}>In-Home Nursing</button>
          <button className="glass-panel" style={{ padding: "10px 24px", borderRadius: 20, background: "white", border: "1px solid var(--panel-border)", color: "var(--text-secondary)", fontWeight: 500, cursor: "pointer", transition: "var(--transition)" }}>General Attendants</button>
          <button className="glass-panel" style={{ padding: "10px 24px", borderRadius: 20, background: "white", border: "1px solid var(--panel-border)", color: "var(--text-secondary)", fontWeight: 500, cursor: "pointer", transition: "var(--transition)" }}>Physiotherapy</button>
          <button className="glass-panel" style={{ padding: "10px 24px", borderRadius: 20, background: "white", border: "1px solid var(--panel-border)", color: "var(--text-secondary)", fontWeight: 500, cursor: "pointer", transition: "var(--transition)" }}>AYUSH Care</button>
          <button className="glass-panel" style={{ padding: "10px 24px", borderRadius: 20, background: "white", border: "1px solid var(--panel-border)", color: "var(--text-secondary)", fontWeight: 500, cursor: "pointer", transition: "var(--transition)" }}>Legal & Financial</button>
      </section>

      {/* Service Listings */}
      <section className="grid-3 animate-fade-in delay-2" style={{ marginTop: 32 }}>
          {/* Card 1 */}
          <div className="glass-panel flex-col justify-between">
              <div>
                 <div className="flex-row justify-between" style={{ marginBottom: 16 }}>
                     <div style={{ width: 48, height: 48, borderRadius: 12, background: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👩‍⚕️</div>
                     <span style={{ padding: "4px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 12, fontSize: "0.8rem", fontWeight: 500 }}>Nursing</span>
                 </div>
                 <h3 className="text-xl font-bold">HealthCare AtHome</h3>
                 <p className="text-sm text-muted" style={{ marginTop: 8 }}>Vetted nursing attendants for 12/24 hour post-surgery recovery and long-term geriatric care.</p>
                 
                 <div className="flex-row text-sm" style={{ marginTop: 16, gap: 24 }}>
                    <div className="flex-row" style={{ gap: 6 }}>⭐ 4.9 (1.2k)</div>
                    <div className="flex-row" style={{ gap: 6 }}>📍 Delhi NCR / Blr</div>
                 </div>
              </div>
              <div className="flex-row justify-between" style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
                  <div>
                      <span className="text-xs text-muted">Daily starting at</span>
                      <p className="font-bold text-lg">₹1,200<span className="text-sm text-muted font-medium">/12h</span></p>
                  </div>
                  <button className="btn-primary" style={{ padding: "8px 16px", borderRadius: 8 }}>Book Now</button>
              </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel flex-col justify-between">
              <div>
                 <div className="flex-row justify-between" style={{ marginBottom: 16 }}>
                     <div style={{ width: 48, height: 48, borderRadius: 12, background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🧘</div>
                     <span style={{ padding: "4px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 12, fontSize: "0.8rem", fontWeight: 500 }}>Physio</span>
                 </div>
                 <h3 className="text-xl font-bold">Portea Medical</h3>
                 <p className="text-sm text-muted" style={{ marginTop: 8 }}>Specialized geriatric physiotherapy sessions for joint pain, mobility improvement, and rehab.</p>
                 
                 <div className="flex-row text-sm" style={{ marginTop: 16, gap: 24 }}>
                    <div className="flex-row" style={{ gap: 6 }}>⭐ 4.8 (2.4k)</div>
                    <div className="flex-row" style={{ gap: 6 }}>📍 Nationwide</div>
                 </div>
              </div>
              <div className="flex-row justify-between" style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
                  <div>
                      <span className="text-xs text-muted">Per Session</span>
                      <p className="font-bold text-lg">₹950<span className="text-sm text-muted font-medium">/hr</span></p>
                  </div>
                  <button className="btn-primary" style={{ padding: "8px 16px", borderRadius: 8 }}>Book Now</button>
              </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel flex-col justify-between">
              <div>
                 <div className="flex-row justify-between" style={{ marginBottom: 16 }}>
                     <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📜</div>
                     <span style={{ padding: "4px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 12, fontSize: "0.8rem", fontWeight: 500 }}>Legal</span>
                 </div>
                 <h3 className="text-xl font-bold">Elder Legal Aid</h3>
                 <p className="text-sm text-muted" style={{ marginTop: 8 }}>Assistance with Will drafting, Property legalities, and Pension/PF documentation for seniors.</p>
                 
                 <div className="flex-row text-sm" style={{ marginTop: 16, gap: 24 }}>
                    <div className="flex-row" style={{ gap: 6 }}>⭐ 4.7 (430)</div>
                    <div className="flex-row" style={{ gap: 6 }}>📞 Online</div>
                 </div>
              </div>
              <div className="flex-row justify-between" style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
                  <div>
                      <span className="text-xs text-muted">Consultation</span>
                      <p className="font-bold text-lg">₹3,500<span className="text-sm text-muted font-medium">/fix</span></p>
                  </div>
                  <button className="btn-primary" style={{ padding: "8px 16px", borderRadius: 8 }}>Inquire</button>
              </div>
          </div>
          
      </section>
    </main>
  );
}
