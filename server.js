// server.js (ES Modules - Ditingkatkan untuk Clever Cloud)
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import 'dotenv/config';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000; // Pastikan port ini konsisten dengan URL fetch di frontend

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kritik_saran',

};
// --- END MODIFIKASI ---

let pool;

/**
 * Membuat dan menguji koneksi pool ke database MySQL.
 * @returns {mysql.Pool} Objek pool koneksi jika berhasil.
 * @throws {Error} Jika koneksi gagal.
 */
async function initializeDatabase() {
    try {
        pool = mysql.createPool(dbConfig);
        const connection = await pool.getConnection();
        console.log('✅ Berhasil terhubung ke database MySQL.');
        connection.release();
        return pool;
    } catch (error) {
        console.error('❌ Gagal terhubung ke database MySQL:', error);
        throw error; // Melempar error untuk menghentikan startServer
    }
}

// --- Middleware ---
app.use(cors());       // Mengaktifkan Cross-Origin Resource Sharing
app.use(express.json()); // Mem-parse body permintaan sebagai JSON

// --- Rute (Routes) ---

/**
 * Rute utama untuk menyapa pengguna.
 */
app.get('/', (req, res) => {
    res.send('Server API untuk Kritik & Saran sedang berjalan!');
});

/**
 * Rute untuk menerima dan menyimpan data kritik & saran.
 */
app.post('/submit-saran', async (req, res) => {
    const { nama, email, pesan } = req.body;

    // 1. Validasi Input
    if (!nama || !email || !pesan) {
        return res.status(400).json({ message: 'Semua field (nama, email, pesan) wajib diisi.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Format email tidak valid.' });
    }

    let connection;
    try {
        // 2. Dapatkan koneksi dan eksekusi query
        connection = await pool.getConnection();
        const sql = "INSERT INTO kritik_saran (nama, email, pesan) VALUES (?, ?, ?)";
        const [result] = await connection.execute(sql, [nama, email, pesan]);

        console.log(`Data baru ditambahkan dengan ID: ${result.insertId}`);
        res.status(201).json({ message: 'Saran Anda berhasil dikirim. Terima kasih!' });

    } catch (error) {
        // 3. Penanganan Error
        console.error('Error saat menyimpan data:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server saat memproses permintaan Anda.',
            error: error.code // Mengirim kode error untuk debugging
        });
    } finally {
        // 4. Selalu lepaskan koneksi
        if (connection) {
            connection.release();
        }
    }
});

// --- Inisialisasi Server ---

/**
 * Fungsi utama untuk memulai aplikasi.
 * Menginisialisasi database terlebih dahulu, kemudian menjalankan server Express.
 */
async function startServer() {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
            console.log(`Terhubung ke database '${dbConfig.database}' di host '${dbConfig.host}'.`);
        });
    } catch (error) {
        console.error("⛔ GAGAL memulai server karena masalah database.");
        process.exit(1); // Keluar dari proses jika database tidak dapat dijangkau
    }
}

startServer();
