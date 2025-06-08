// File: /api/submit-kritik.js

// Impor library mysql2 untuk koneksi database
const mysql = require('mysql2/promise');

export default async function handler(req, res) {
  // Langkah 1: Pastikan metode request adalah POST.
  // Ini penting untuk keamanan agar endpoint tidak bisa diakses langsung dari URL.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  let connection; // Deklarasikan variabel koneksi di luar blok try

  try {
    // Langkah 2: Ambil data (nama, email, kritik) dari body request.
    // Frontend harus mengirimkan objek JSON dengan properti ini.
    const { nama, email, kritik } = req.body;

    // Langkah 3: Lakukan validasi dasar.
    // Pastikan semua data yang dibutuhkan sudah terisi.
    if (!nama || !email || !kritik) {
      return res.status(400).json({ message: 'Semua field (Nama, Email, dan Kritik) wajib diisi.' });
    }

    // Langkah 4: Buat koneksi ke database Clever Cloud Anda.
    // Kredensial diambil dengan aman dari Environment Variables di Vercel.
    connection = await mysql.createConnection({
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
    });

    // Langkah 5: Siapkan kueri SQL sesuai dengan struktur tabel Anda.
    // Tabel: kritik_saran
    // Kolom: nama, email, pesan
    const query = 'INSERT INTO kritik_saran (nama, email, pesan) VALUES (?, ?, ?)';
    
    // Siapkan nilai yang akan dimasukkan.
    // Perhatikan: req.body.kritik akan dimasukkan ke dalam kolom 'pesan'.
    const values = [nama, email, kritik];

    // Langkah 6: Eksekusi kueri dengan aman menggunakan prepared statements.
    // Ini melindungi dari serangan SQL Injection.
    await connection.execute(query, values);

    // Langkah 7: Kirim respons sukses ke frontend.
    return res.status(200).json({ message: 'Terima kasih! Kritik dan saran Anda telah kami terima.' });

  } catch (error) {
    // Langkah 8: Tangani jika ada error pada koneksi atau kueri.
    console.error('Database Error:', error); // Tampilkan detail error di log Vercel untuk debugging.
    return res.status(500).json({ message: 'Terjadi kesalahan pada server, gagal mengirim saran.' });
  
  } finally {
    // Langkah 9: Pastikan koneksi ke database selalu ditutup.
    // Ini sangat penting untuk mencegah kehabisan koneksi di database Anda.
    if (connection) {
      await connection.end();
    }
  }
}
