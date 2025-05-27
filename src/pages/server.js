// server.js

// 1. Mengimpor Modul yang Diperlukan
const express = require('express');        // Framework untuk membuat server HTTP dengan mudah
const mysql = require('mysql2/promise');   // Driver untuk berinteraksi dengan database MySQL (versi promise)
const path = require('path');              // Utilitas untuk bekerja dengan path file dan direktori

// 2. Inisialisasi Aplikasi Express
const app = express();                     // Membuat instance aplikasi Express
const port = 3306;                         // Nomor port tempat server akan mendengarkan permintaan

// 3. Middleware (Perangkat Lunak Perantara)
// Middleware ini dijalankan untuk setiap permintaan yang masuk sebelum mencapai handler rute
app.use(express.json()); // Mem-parsing body permintaan yang berformat JSON (dikirim dari React)
// app.use(express.urlencoded({ extended: true })); // Untuk mem-parsing data form tradisional (jika digunakan)
// app.use(express.static(path.join(__dirname, 'public'))); // Menyajikan file statis jika ada (misal, jika Node.js juga menyajikan HTML awal)

// 4. Konfigurasi Koneksi ke Server Database MySQL
const dbConfig = {
    host: 'localhost',          // Alamat server MySQL Anda (biasanya 'localhost' jika di mesin yang sama)
    user: 'root',               // Username untuk login ke MySQL
    password: '',               // Password untuk login ke MySQL
    database: 'test_laragon' // Nama database yang ingin Anda gunakan
};

// 5. Membuat "Connection Pool" ke Server Database MySQL
// Pool lebih efisien daripada membuat koneksi baru setiap kali ada permintaan
const pool = mysql.createPool(dbConfig);

// 6. Mendefinisikan Rute (Endpoints) untuk Menerima Permintaan dari Frontend
// Contoh: Rute untuk menangani pengiriman formulir kritik dan saran
app.post('/submit-saran', async (req, res) => {
    // `req` (request): Objek yang berisi informasi tentang permintaan dari frontend (misalnya, data formulir)
    // `res` (response): Objek yang digunakan untuk mengirim balasan kembali ke frontend

    const { nama, email, pesan } = req.body; // Mengambil data dari body JSON permintaan

    // Validasi sederhana (sebaiknya lebih komprehensif)
    if (!nama || !email || !pesan) {
        return res.status(400).json({ message: 'Semua field harus diisi!' });
    }

    let connection; // Variabel untuk menyimpan koneksi database
    try {
        // 7. Mendapatkan Koneksi dari Pool untuk Berinteraksi dengan Server MySQL
        connection = await pool.getConnection(); // "Meminjam" satu koneksi dari pool

        // 8. Menyiapkan dan Menjalankan Perintah SQL ke Server MySQL
        const sql = "INSERT INTO kritik_saran (nama, email, pesan) VALUES (?, ?, ?)";
        // `execute` dengan placeholder `?` menggunakan "prepared statements", aman dari SQL Injection
        await connection.execute(sql, [nama, email, pesan]); // Mengirim perintah SQL ke server MySQL

        console.log('Data berhasil dimasukkan dari frontend.');
        // 9. Mengirim Respons Sukses Kembali ke Frontend
        res.status(201).json({ message: 'Kritik dan saran Anda berhasil dikirim. Terima kasih!' });

    } catch (error) {
        console.error('Error saat memasukkan data ke database:', error);
        // Mengirim Respons Error Kembali ke Frontend
        res.status(500).json({ message: 'Terjadi kesalahan pada server saat menyimpan data.' });
    } finally {
        if (connection) {
            // 10. Melepaskan Koneksi Kembali ke Pool (Sangat Penting!)
            connection.release(); // Mengembalikan koneksi agar bisa digunakan permintaan lain
        }
    }
});

// (Tambahkan rute lain jika diperlukan, misalnya app.get('/') untuk menyajikan halaman utama jika Node.js bertanggung jawab untuk itu)
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html')); // Jika Node.js juga melayani file HTML
// });


// 11. Menjalankan Server HTTP Node.js
app.listen(port, () => {
    console.log(`Server Node.js berjalan di http://localhost:${port}`);
    console.log(`Server ini siap menerima permintaan dari frontend (misalnya aplikasi React Anda).`);
    console.log(`Dan akan mencoba terhubung ke server database MySQL di ${dbConfig.host} untuk operasi data.`);
});