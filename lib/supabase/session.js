import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Membuat koneksi sesi admin memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY
 * dengan cookie login (@supabase/ssr).
 * Digunakan untuk login, keluar, ganti password, dan aksi kelola produk di server.
 */
export async function createSessionClient() {
  const cookieStore = await cookies();
  const rawUrl = process.env.SUPABASE_URL || "";
  const supabaseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  const supabaseKey = (process.env.SUPABASE_PUBLISHABLE_KEY || "").trim();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Diabaikan jika dipanggil dari Server Component di mana cookies tidak dapat diubah
        }
      },
    },
  });
}

export const createAdminSessionClient = createSessionClient;
export default createSessionClient;

