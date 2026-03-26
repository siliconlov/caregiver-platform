import { neon } from '@neondatabase/serverless';
import Database from 'better-sqlite3';

// Determine if we're using Postgres (Vercel/Production) or SQLite (Local)
const isPostgres = process.env.DATABASE_URL?.startsWith('postgres');

class UnifiedDB {
  private sqlite: any;
  private neon: any;

  constructor() {
    if (isPostgres) {
      this.neon = neon(process.env.DATABASE_URL!);
      console.log('Using Neon PostgreSQL');
    } else {
      this.sqlite = new Database('./dev.db');
      console.log('Using local SQLite');
      this.initSqlite();
    }
  }

  private initSqlite() {
    this.sqlite.exec(`
      CREATE TABLE IF NOT EXISTS User (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        passwordHash TEXT
      );
      CREATE TABLE IF NOT EXISTS Elder (
         id TEXT PRIMARY KEY,
         caregiverId TEXT,
         fullName TEXT,
         birthDate TEXT,
         locationCity TEXT,
         medicalNotes TEXT,
         FOREIGN KEY(caregiverId) REFERENCES User(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS CareTask (
         id TEXT PRIMARY KEY,
         elderId TEXT,
         creatorId TEXT,
         title TEXT,
         category TEXT,
         dueDate TEXT,
         isCompleted INTEGER DEFAULT 0,
         FOREIGN KEY(elderId) REFERENCES Elder(id) ON DELETE CASCADE
      );
    `);
  }

  // Unified Query Helper
  async query(sql: string, params: any[] = []) {
    if (isPostgres) {
      // Convert SQLite ? to Postgres $1, $2
      let pgSql = sql;
      params.forEach((_, i) => {
        pgSql = pgSql.replace('?', `$${i + 1}`);
      });
      return await this.neon(pgSql, params);
    } else {
      const stmt = this.sqlite.prepare(sql);
      if (sql.trim().toLowerCase().startsWith('select')) {
        return stmt.all(...params);
      } else {
        return stmt.run(...params);
      }
    }
  }

  // Compatibility helper for existing code
  prepare(sql: string) {
    return {
      run: (...params: any[]) => this.query(sql, params),
      all: (...params: any[]) => this.query(sql, params),
      get: async (...params: any[]) => {
        const rows = await this.query(sql, params);
        return rows[0];
      }
    };
  }
}

const db = new UnifiedDB();
export default db;
