// config.js — chiavi pubbliche (ok su GitHub)
// La chiave Resend NON va qui — sta nelle variabili d'ambiente di Netlify
const CONFIG = {
  // ── Supabase ──────────────────────────────────────────────
  supabaseUrl: 'https://rglxnxhdrmnhuwwmnmeo.supabase.co',   // ← sostituisci
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbHhueGhkcm1uaHV3d21ubWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MzMzMDUsImV4cCI6MjA4OTAwOTMwNX0.XjDFhXMUEqXXLu3uz5dyxXazfuVsQXEdwsk_3B7SZZM', // ← anon key

  // ── Email (mittente e admin — non la API key) ─────────────
  resendFrom:  'events@proloco.xyz',   // ← sostituisci
  resendAdmin: 'morisani@me.com',    // ← sostituisci (riceve copia RSVP)

  // ── App ───────────────────────────────────────────────────
  adminPassword: 'pizzetta',          // ← cambia con una password sicura
};
