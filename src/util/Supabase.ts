import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLIC_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

let db;
export function dbConnect() {
  if (!db) {
    db = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
      realtime: {
        params: {
          eventsPerSecond: 2
        }
      }
    });
  }
  return db;
}