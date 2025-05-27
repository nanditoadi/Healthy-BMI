// src/components/KritikSaranForm.jsx
import React, { useState } from 'react';

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
      const response = await fetch('/submit-saran', { // Pastikan route ini sesuai dengan backend Node.js Anda
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, email, pesan }),
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
    <div className="kritik-saran-form-container">
      <h3>Kirim Kritik & Saran Anda</h3>
      {message && (
        <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nama-saran">Nama:</label>
          <input
            type="text"
            id="nama-saran"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email-saran">Email:</label>
          <input
            type="email"
            id="email-saran"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pesan-saran">Kritik/Saran:</label>
          <textarea
            id="pesan-saran"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit">Kirim Saran</button>
      </form>
      <style jsx>{`
        .kritik-saran-form-container {
          margin-top: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          max-width: 500px; /* Atur lebar maksimum form */
        }
        .kritik-saran-form-container h3 {
          margin-top: 0;
          text-align: center;
        }
        .kritik-saran-form-container div {
          margin-bottom: 15px;
        }
        .kritik-saran-form-container label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .kritik-saran-form-container input[type="text"],
        .kritik-saran-form-container input[type="email"],
        .kritik-saran-form-container textarea {
          width: calc(100% - 20px); /* Sesuaikan padding */
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        .kritik-saran-form-container button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .kritik-saran-form-container button:hover {
          background-color: #0056b3;
        }
        .message {
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 4px;
          text-align: center;
        }
        .success-message {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
};

export default KritikSaranForm;