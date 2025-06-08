// server.js (ES Modules - Ditingkatkan untuk Clever Cloud)
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import 'dotenv/config';

const app = express();
// Clever Cloud (atau platform hosting lain) akan menyediakan port melalui process.env.PORT
const port = process.env.PORT || 3306;

// Middleware
app.use(cors()); // Memungkinkan request dari domain lain (frontend Vercel Anda)
app.use(express.json()); // Mem-parsing body request JSON

// --- START MODIFIKASI: Konfigurasi Database ---
// Konfigurasi sekarang mengambil data dari Environment Variables
// Sama seperti yang Anda atur di Vercel, Anda juga harus mengaturnya
// di platform tempat Anda menghosting server.js ini (misalnya, di Clever Cloud).
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    port: 3306,
    ssl: {
      // Opsi SSL ini seringkali dibutuhkan oleh layanan database cloud
      // untuk memastikan koneksi yang terenkripsi dan aman.
      rejectUnauthorized: true,
    }
};
// --- END MODIFIKASI ---

let pool;
try {
    pool = mysql.createPool(dbConfig);
    console.log("MySQL Connection Pool berhasil dibuat.");
    // Tes koneksi awal saat server startup
    const connectionTest = await pool.getConnection();
    console.log('Berhasil terhubung ke database MySQL di Clever Cloud!');
    connectionTest.release();
} catch (error) {
    console.error("GAGAL KONEK KE DATABASE:", error);
    // Jika database gagal terkoneksi, server tidak bisa berfungsi dengan baik.
}

// Rute untuk mengirim saran
// Di frontend, Anda akan fetch ke: https://<URL-server-anda>/submit-saran
app.post('/submit-saran', async (req, res) => {
    // Diambil dari kode /api/submit-kritik.js Anda, ini sudah bagus.
    const { nama, email, kritik } = req.body;

    if (!nama || !email || !kritik) {
        return res.status(400).json({ message: 'Semua field (Nama, Email, dan Kritik) wajib diisi.' });
    }
    
    // Pastikan pool sudah terbuat sebelum melanjutkan
    if (!pool) {
      console.error("Pool koneksi tidak tersedia.");
      return res.status(500).json({ message: 'Kesalahan konfigurasi server.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // Menggunakan kolom 'pesan' sesuai struktur tabel Anda
        const sql = "INSERT INTO kritik_saran (nama, email, pesan) VALUES (?, ?, ?)";
        const values = [nama, email, kritik]; // 'kritik' dari form dimasukkan ke kolom 'pesan'
        
        await connection.execute(sql, values);

        res.status(201).json({ message: 'Kritik dan saran Anda berhasil dikirim. Terima kasih!' });

    } catch (error) {
        console.error('Error saat menyimpan data:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server saat menyimpan data.' });
    } finally {
        if (connection) {
            connection.release(); // Melepaskan koneksi kembali ke pool
        }
    }
});

app.get('/', (req, res) => {
    res.send('Server Node.js untuk Kritik & Saran berjalan dan siap menerima data!');
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
    if (pool) {
        console.log(`Terhubung ke database di host '${dbConfig.host}'.`);
    } else {
        console.warn("PERINGATAN: Server berjalan TETAPI GAGAL terhubung ke database.");
    }
});
