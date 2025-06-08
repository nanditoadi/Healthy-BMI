// src/components/KritikSaranForm.jsx
import React, { useState } from 'react';
import komponenkritikImage from "../assets/komponen kritik.svg";

const KritikSaranForm = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');
  const [message, setMessage] = useState(''); // Untuk pesan sukses/error
  const [messageType, setMessageType] = useState(''); // 'success' atau 'error'

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    setMessage(''); // Bersihkan pesan sebelumnya
    setMessageType('');

    if (!nama || !email || !pesan) {
      setMessage('Semua field harus diisi!');
      setMessageType('error');
      return;
    }

    // Validasi format email sederhana (bisa lebih kompleks jika perlu)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setMessage('Format email tidak valid!');
        setMessageType('error');
        return;
    }

    try {
      const response = await fetch('/submit-saran', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({ nama, email, pesan }), // Pastikan field sesuai dengan backend
  });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setMessageType('success');
        // Kosongkan form setelah berhasil
        setNama('');
        setEmail('');
        setPesan('');
      } else {
        setMessage(result.message || 'Terjadi kesalahan saat mengirim saran.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
      setMessageType('error');
    }
  };

    return (
  // Container utama untuk halaman/section ini (opsional, untuk padding dan centering keseluruhan)
  <div className="py-25 px-4 mt-24">
    {/* Container dua kolom */}
    <div 
    
    className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 items-start">

      {/* Kolom Kiri: Form Kritik & Saran */}
      <div className="w-full md:w-3/5 lg:w-1/2 bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        {/* Konten Form Dimulai Di Sini */}
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Kritik & Saran</h2>
        <p className="text-gray-600 mb-8">
          Kami ada untuk Anda! Apa yang dapat kami lakukan untuk memperbaiki layanan kami?
        </p>

        {message && (
          <div
            className={`p-3 mb-6 rounded-md text-sm ${
              messageType === 'success'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="nama-saran" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              id="nama-saran"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder='Nama'
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email-saran" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email-saran"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Alamat Email"
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="pesan-saran" className="block text-sm font-medium text-gray-700 mb-1">
              Kritik & Saran
            </label>
            <textarea
              id="pesan-saran"
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              rows="5"
              required
              placeholder="Tulis Kritik & Saran mu"
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-75"
          >
            Kirim
          </button>
        </form>
        {/* Konten Form Berakhir Di Sini */}
      </div>

      {/* Kolom Kanan: Tempat untuk Gambar */}
      <div className="w-full md:w-2/5 lg:w-1/2 mt-8 md:mt-0 ">
        {/* Anda bisa mengganti div di bawah ini dengan tag <img> atau komponen gambar lainnya */}
        <div className="rounded-lg h-auto md:h-full min-h-[300px] md:min-h-[500px] flex items-center justify-center p-6 mt-20">
          {/* Contoh Placeholder Gambar */}
          <img
            // src="URL_GAMBAR_ANDA" // Ganti dengan URL gambar Anda
            src={komponenkritikImage} // Placeholder example
            alt="Deskripsi Gambar Anda"
            className="max-w-full h-auto max-h-[450px] object-contain rounded "
          />
          {/* Atau teks jika belum ada gambar:
          <span className="text-gray-500 text-xl">Tempat Gambar Anda</span>
          */}
        </div>
        {/* Anda bisa menambahkan caption atau teks lain di bawah gambar jika perlu */}
        {/* <p className="text-center text-gray-600 mt-4">Ini adalah deskripsi untuk gambar di atas.</p> */}
      </div>

    </div>
  </div>
);
};

export default KritikSaranForm;