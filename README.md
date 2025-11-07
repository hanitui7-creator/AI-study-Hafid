# AI Study HAFID - Asisten Tutor AI

Ini adalah repositori untuk AI Study HAFID, sebuah Progressive Web App (PWA) yang berfungsi sebagai asisten tutor AI pribadi. Aplikasi ini dirancang untuk membantu mahasiswa menjawab pertanyaan akademis, memberikan penjelasan mendalam, dan mendorong pembelajaran lebih lanjut.

## ✨ Fitur Utama

-   **Antarmuka Percakapan:** Desain modern dan minimalis yang fokus pada interaksi tanya jawab.
-   **Jawaban Real-time:** Respons dari AI ditampilkan secara streaming, kata per kata.
-   **Jawaban Terverifikasi:** Didukung oleh Google Search, setiap jawaban disertai dengan sumber referensi yang valid.
-   **Dukungan Markdown:** Jawaban diformat dengan baik untuk keterbacaan maksimal (judul, daftar, kode, dll.).
-   **Dapat Di-install (PWA):** Tambahkan aplikasi ini ke layar utama (home screen) di perangkat Android atau iOS Anda untuk pengalaman seperti aplikasi asli.
-   **Fungsi Offline:** Aplikasi dapat dibuka dan diakses bahkan tanpa koneksi internet.
-   **Bahasa Indonesia:** Dirancang khusus untuk pengguna berbahasa Indonesia.

## 🚀 Cara Menjalankan & Deploy

Proyek ini adalah aplikasi frontend murni dan tidak memerlukan proses build yang rumit. Anda bisa langsung men-deploy-nya ke layanan hosting statis seperti GitHub Pages, Netlify, atau Vercel.

### Prasyarat

1.  **Kunci API Gemini:** Anda memerlukan Kunci API dari Google AI Studio.
    -   Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey) untuk mendapatkan kunci Anda.
2.  **Akun GitHub:** Untuk melakukan hosting menggunakan GitHub Pages.

### Deploy ke GitHub Pages (Rekomendasi)

1.  **Fork atau Clone Repositori Ini:**
    -   Salin semua file dari proyek ini ke dalam repositori GitHub baru Anda.

2.  **Konfigurasi Kunci API:**
    -   Di repositori GitHub Anda, buka `Settings` > `Secrets and variables` > `Actions`.
    -   Pilih tab `Variables` dan klik `New repository variable`.
    -   Buat variabel baru dengan nama `API_KEY`.
    -   Tempel (paste) Kunci API Gemini Anda sebagai nilainya.
    -   **PENTING:** Kunci ini akan digunakan secara otomatis oleh aplikasi saat di-deploy.

3.  **Aktifkan GitHub Pages:**
    -   Di repositori GitHub Anda, buka `Settings` > `Pages`.
    -   Pada bagian `Build and deployment`, di bawah `Source`, pilih `Deploy from a branch`.
    -   Pilih branch `main` (atau `master`) dan folder `/ (root)`.
    -   Klik `Save`.
    -   Tunggu beberapa menit hingga proses deployment selesai. URL publik aplikasi Anda akan ditampilkan di halaman ini.

Sekarang, siapa pun dapat mengunjungi URL tersebut dan meng-install aplikasi HAFID AI di perangkat mereka!

---

Dibangun dengan ❤️ menggunakan React, Tailwind CSS, dan Google Gemini API.
