// server.js (ES Modules - Debugging Ditingkatkan)
import express from 'express';
import mysql from 'mysql2/promise';
import path from 'path';
import cors from 'cors';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000; // Pastikan port ini konsisten dengan URL fetch di frontend

// Middleware
app.use(cors()); // PENTING: Panggil cors() SEBELUM rute Anda
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kritik_saran'
};

let pool;
try {
    pool = mysql.createPool(dbConfig);
    console.log("MySQL Connection Pool berhasil dibuat.");
    // Tes koneksi awal
    const connectionTest = await pool.getConnection();
    console.log('Berhasil terhubung ke database MySQL untuk tes awal!');
    connectionTest.release();
} catch (error) {
    console.error("Gagal membuat atau menguji MySQL Connection Pool:", error);
    // Jika pool gagal dibuat, server mungkin tidak berguna, tapi kita tetap jalankan
    // agar bisa merespons dengan error jika ada permintaan.
    // Atau pertimbangkan: process.exit(1);
}

// Rute
app.post('/submit-saran', async (req, res) => {
    console.log('Menerima permintaan POST ke /submit-saran'); // Logging #1
    console.log('Body permintaan:', req.body); // Logging #2

    const { nama, email, pesan } = req.body;

    if (!nama || !email || !pesan) {
        console.log('Validasi gagal: Field tidak lengkap');
        return res.status(400).json({ message: 'Semua field harus diisi!' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('Validasi gagal: Format email tidak valid');
        return res.status(400).json({ message: 'Format email tidak valid!' });
    }

    if (!pool) {
        console.error("FATAL: Connection pool tidak tersedia saat memproses permintaan.");
        return res.status(500).json({ message: 'Kesalahan server: Pool koneksi database tidak terinisialisasi.' });
    }

    let connection;
    try {
        console.log('Mencoba mendapatkan koneksi dari pool...'); // Logging #3
        connection = await pool.getConnection();
        console.log('Koneksi database berhasil didapatkan.'); // Logging #4

        const sql = "INSERT INTO kritik_saran (nama, email, pesan) VALUES (?, ?, ?)";
        console.log('Menjalankan SQL:', sql, 'dengan data:', [nama, email, pesan]); // Logging #5
        const [result] = await connection.execute(sql, [nama, email, pesan]);
        console.log('Data berhasil dimasukkan, ID:', result.insertId); // Logging #6

        res.status(201).json({ message: 'Kritik dan saran Anda berhasil dikirim. Terima kasih!' });

    } catch (error) {
        console.error('Error di rute /submit-saran:', error); // Logging #7 (SANGAT PENTING)
        // Pastikan selalu mengirim respons JSON
        let errorMessage = 'Terjadi kesalahan pada server saat menyimpan data.';
        if (error.code) {
             errorMessage += ` (Kode: ${error.code})`;
        }
        res.status(500).json({ message: errorMessage, error: error.message });
    } finally {
        if (connection) {
            console.log('Melepaskan koneksi database.'); // Logging #8
            connection.release();
        }
    }
});

app.get('/', (req, res) => {
    res.send('Server Node.js untuk Kritik & Saran berjalan!');
});

app.listen(port, () => {
    console.log(`Server Node.js berjalan di http://localhost:${port}`);
    if (pool) {
        console.log(`Terhubung ke database MySQL '${dbConfig.database}' di host '${dbConfig.host}'.`);
    } else {
        console.warn("PERINGATAN: Server berjalan TETAPI pool koneksi database GAGAL diinisialisasi.");
    }
});
