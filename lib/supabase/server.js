import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase untuk server memakai SUPABASE_URL dan SUPABASE_SECRET_KEY.
 * Digunakan di sisi server untuk membaca data publik (katalog dan detail produk).
 */
export function createClient() {
  const rawUrl = process.env.SUPABASE_URL || "";
  const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  const supabaseKey = (process.env.SUPABASE_SECRET_KEY || "").trim();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export { createSessionClient, createAdminSessionClient } from "./session.js";
export const createServerClient = createClient;
export default createClient;
