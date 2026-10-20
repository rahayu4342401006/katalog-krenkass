"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase";

/**
 * Server Action untuk memproses login admin menggunakan Supabase Auth (email dan password).
 */
export async function login(prevState, formData) {
  let data = formData;
  if (!data && prevState instanceof FormData) {
    data = prevState;
  } else if (!data && typeof prevState?.get === "function") {
    data = prevState;
  }

  const email = data?.get ? data.get("email") : data?.email;
  const password = data?.get ? data.get("password") : data?.password;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  try {
    const supabase = await createSessionClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(email).trim(),
      password: String(password),
    });

    if (error) {
      if (
        error.code === "invalid_credentials" ||
        error.message?.toLowerCase().includes("invalid login credentials")
      ) {
        return { error: "Email atau password salah." };
      }
      return { error: error.message || "Gagal masuk." };
    }
  } catch (err) {
    if (err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return { error: err.message || "Terjadi kesalahan server saat masuk." };
  }

  redirect("/admin");
}

/**
 * Server Action untuk mengakhiri sesi admin (logout) dan kembali ke halaman login.
 */
export async function keluar() {
  try {
    const supabase = await createSessionClient();
    await supabase.auth.signOut();
  } catch (err) {
    if (err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.error("Gagal keluar:", err);
  }

  redirect("/admin/login");
}

export const logout = keluar;

/**
 * Server Action untuk mengganti password admin yang sedang login.
 */
export async function gantiPassword(prevState, formData) {
  let data = formData;
  if (!data && prevState instanceof FormData) {
    data = prevState;
  } else if (!data && typeof prevState?.get === "function") {
    data = prevState;
  }

  const passwordBaru = data?.get ? data.get("password_baru") : data?.password_baru;
  const konfirmasiPassword = data?.get ? data.get("konfirmasi_password") : data?.konfirmasi_password;

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password tidak sama." };
  }

  try {
    const supabase = await createSessionClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: "Sesi admin berakhir atau belum masuk. Silakan masuk terlebih dahulu." };
    }

    const { error } = await supabase.auth.updateUser({
      password: String(passwordBaru),
    });

    if (error) {
      return { error: error.message || "Gagal mengganti password." };
    }

    return { success: true, message: "Password berhasil diganti." };
  } catch (err) {
    return { error: err.message || "Terjadi kesalahan server saat mengganti password." };
  }
}

export const updatePassword = gantiPassword;
