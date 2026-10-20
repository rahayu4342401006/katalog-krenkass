# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Koneksi Supabase sisi server dibuat di folder `lib/supabase` memakai `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`. Halaman katalog `app/page.jsx` kini mengambil seluruh produk dari tabel `produk` di Supabase di sisi server, menampilkan daftar dengan `KartuProduk`, menangani pesan error, menampilkan teks "Belum ada produk" saat tabel kosong, dan menghapus `CatatanBelumAktif`.

**Perbaikan:**
Normalisasi nilai `SUPABASE_URL` pada koneksi server dan `.env.local` agar menghapus akhiran `/rest/v1` serta spasi yang tidak disengaja.

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Halaman detail produk `app/produk/[id]/page.jsx` diubah untuk mengambil data produk berdasarkan `id` dari tabel `produk` di Supabase di sisi server. Jika produk tidak ditemukan atau terjadi kesalahan id, fungsi `notFound()` dipanggil. Komponen `CatatanBelumAktif` dan referensi data contoh dihapus, sedangkan tampilan dan tombol WhatsApp tetap dipertahankan.

**Perbaikan:**
-

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Komponen `components/TombolWhatsApp.jsx` diubah menjadi elemen `<a>` yang membuka tautan WhatsApp `https://wa.me/<nomor>?text=<pesan>` ke nomor di `lib/toko.js` dengan pesan terisi nama dan harga produk dalam format rupiah yang di-encode dengan `encodeURIComponent`. Tombol membuka tab baru (`target="_blank"`, `rel="noopener noreferrer"`) dan mempertahankan styling bawaan. `CatatanBelumAktif` yang menyebut US-03 di halaman detail produk telah dihapus.

**Perbaikan:**
-

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
Koneksi sesi admin dibuat di `lib/supabase/session.js` menggunakan `@supabase/ssr` dan cookies dengan `SUPABASE_URL` serta `SUPABASE_PUBLISHABLE_KEY`. Server Action `login` dan `keluar` dibuat di `app/admin/actions.js`. Form di `app/admin/login/page.jsx` disambungkan ke Server Action `login`, menampilkan pesan error saat login gagal, dan mengarahkan ke `/admin` saat berhasil. Tombol "Keluar" di `components/NavAdmin.jsx` difungsikan untuk mengakhiri sesi dan kembali ke `/admin/login`. Komponen `CatatanBelumAktif` dihapus dari halaman login tanpa mengubah tampilan form.

**Perbaikan:**
-

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Server Action `gantiPassword` dibuat di `app/admin/actions.js` dengan validasi server (minimal 8 karakter, konfirmasi cocok, dan verifikasi sesi login admin) serta memanggil `supabase.auth.updateUser`. Form di `app/admin/password/page.jsx` disambungkan ke Server Action menggunakan `useActionState`, menampilkan pesan berhasil atau error yang jelas, mempertahankan tampilan antarmuka, dan menghapus `CatatanBelumAktif`.

**Perbaikan:**
-

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
