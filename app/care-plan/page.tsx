import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import db from '@/lib/db';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function CarePlan({ 
  searchParams 
}: { 
  searchParams: Promise<{ date?: string }> 
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const { date: selectedDateParam } = await searchParams;
  const today = new Date().toISOString().split('T')[0];
  const selectedDate = selectedDateParam || today;

  const userId = (session.user as any).id;

  async function addTask(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const dueDate = formData.get('dueDate') as string;
    const targetDate = dueDate || selectedDate;
    
    if (!title) return;

    const id = crypto.randomUUID();
    await db.prepare('INSERT INTO "CareTask" (id, "creatorId", title, category, "dueDate", "isCompleted") VALUES (?, ?, ?, ?, ?, 0)').run(id, userId, title, category, targetDate);

    revalidatePath('/care-plan');
  }

  // Fetch tasks for the selected date - AWAITED
  const dailyTasks = await db.prepare('SELECT * FROM "CareTask" WHERE "creatorId" = ? AND "dueDate" = ? ORDER BY id DESC').all(userId, selectedDate) as any[];

  // For the calendar "dots", we need to know WHICH days have tasks - AWAITED
  const datesRaw = await db.prepare('SELECT DISTINCT "dueDate" FROM "CareTask" WHERE "creatorId" = ?').all(userId);
  const datesWithTasks = (datesRaw as any[]).map(d => d.dueDate);

  // Calendar Helpers
  const marchDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dayStr = `2026-03-${day.toString().padStart(2, '0')}`;
    return { day, dayStr };
  });

  return (
    <main className="main-content">
      <header className="flex-row justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Care Plan Calendar</h1>
          <p className="text-muted" style={{ marginTop: 8 }}>Schedule appointments, medications, and visits.</p>
        </div>
      </header>

      <section className="grid-2 animate-fade-in delay-1" style={{ marginTop: 24, alignItems: "start" }}>
        {/* Full Calendar View */}
        <div className="glass-panel">
          <h3 className="text-xl font-bold" style={{ marginBottom: 20 }}>March 2026</h3>
          <div className="grid-3" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: 8, textAlign: "center", marginBottom: 12, color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 500 }}>
             <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
             {marchDays.map(({ day, dayStr }) => {
               const isSelected = selectedDate === dayStr;
               const hasTask = datesWithTasks.includes(dayStr);
               
               return (
                <Link 
                  key={day} 
                  href={`/care-plan?date=${dayStr}`}
                  style={{ 
                   padding: 12, 
                   background: isSelected ? "var(--accent-glow)" : "rgba(255,255,255,0.02)", 
                   border: isSelected ? "1px solid var(--accent-color)" : "1px solid transparent",
                   borderRadius: 8, textAlign: "center", cursor: "pointer", transition: "all 0.2s",
                   display: "block", color: "inherit"
                  }}
                >
                   {day}
                   {hasTask && !isSelected && <div style={{ width: 6, height: 6, background: "var(--warning-color)", borderRadius: 3, margin: "4px auto 0" }}></div>}
                   {isSelected && <div style={{ width: 6, height: 6, background: "white", borderRadius: 3, margin: "4px auto 0" }}></div>}
                </Link>
               );
             })}
          </div>
        </div>

        {/* Selected Day Agenda & Add Form */}
        <div className="flex-col" style={{ gap: 24 }}>
          
          <div className="glass-panel text-left">
            <h3 className="text-xl font-bold" style={{ marginBottom: 24 }}>
              Agenda: {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            
            <div className="flex-col" style={{ gap: 16 }}>
              {dailyTasks.length === 0 && (
                 <p className="text-muted text-sm">No tasks for this day.</p>
              )}
              {dailyTasks.map((task) => (
                 <div key={task.id} style={{ padding: 16, borderLeft: `4px solid ${task.category === 'medication' ? 'var(--warning-color)' : task.category === 'appointment' ? 'var(--accent-color)' : 'var(--success-color)'}`, background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                    <div className="flex-row justify-between">
                        <p className="font-medium text-lg">{task.title}</p>
                    </div>
                    <p className="text-xs text-muted" style={{ marginTop: 6, textTransform: "capitalize" }}>{task.category || 'General'}</p>
                 </div>
              ))}
            </div>
          </div>

          <div className="glass-panel text-left" style={{ background: "rgba(99, 102, 241, 0.05)", borderColor: "rgba(99, 102, 241, 0.2)" }}>
            <h3 className="text-lg font-bold" style={{ marginBottom: 16 }}>+ Add Task for {selectedDate}</h3>
            <form action={addTask} className="flex-col" style={{ gap: 12 }}>
                <input name="title" required placeholder="Task Title (e.g. Amlodipine 10mg)" className="input-field" />
                
                <div className="grid-2" style={{ gap: 12 }}>
                   <select name="category" className="input-field" style={{ padding: "10px 14px" }}>
                      <option value="medication">Medication</option>
                      <option value="appointment">Appointment</option>
                      <option value="social">Social/Visit</option>
                   </select>
                   <input name="dueDate" type="hidden" value={selectedDate} />
                   <button type="submit" className="btn-primary" style={{ boxShadow: "none" }}>Save Task</button>
                </div>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}
