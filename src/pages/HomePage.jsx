// src/components/HomePage.jsx
import React, { useState } from 'react';
import KritikSaranForm from './KritikSaranForm'; // Impor komponen form

// Pastikan path ke gambar benar.
// Jika 'public' adalah folder di root proyek React Anda (seperti pada Create React App atau Vite),
// Anda bisa merujuknya sebagai '/logotab.png'.
// Jika gambar ada di dalam folder 'src', Anda harus mengimpornya.
// Contoh untuk gambar di folder public: const logoPath = "/logotab.png";
// Contoh jika di src/assets: import logoPath from '../assets/logotab.png';
// Saya akan asumsikan gambar ada di folder public untuk contoh ini.
const logoPath = "/BBkurang.svg";


const HomePage = ({ calculateBMI, bmiResult }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleCalculate = () => {
    calculateBMI(weight, height);
  };

  let resultContent;
  if (bmiResult < 18.5 && bmiResult > 0) {
    resultContent = (
      <div>
        <p>Gepeng Banget King</p>
        <p>no ingfo krass</p>
        <p>Makan Yang Banyak King Ben Ora Gepeng nemen lhoh ntnt yakin</p>
        <img src={logoPath} alt="Logo Kurus" 
        style={{
          maxWidth: "600px",  // Ubah ukuran menjadi lebih besar
          display: "block",   // Untuk memastikan margin auto bekerja
          margin: "0 auto",   // Untuk posisi tengah horizontal
          padding: "20px 0"   // Tambahkan jarak atas bawah
        }}  /> {/* Menggunakan variabel logoPath */}
      </div>
    );
  } else if (bmiResult >= 18.5 && bmiResult < 25) {
    resultContent = <p>Keras Normal King</p>;
  } else if (bmiResult >= 25) {
    resultContent = <p>Gendut King NTNT</p>;
  } else {
    resultContent = <p>Hitung BMI Dulu King</p>;
  }

  return (
    <div className="homepage-container"
      style={{
    maxWidth: '500px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Poppins', Poppins",
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      
      <div className="bmi-calculator-section">
        <h2
        style={{
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '1.8rem',
        fontWeight: '600'
       }}>BMI Calculator</h2>
      
        
        <label htmlFor="weight">Bobot (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight} // Tambahkan value untuk controlled component
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Bobot (kg)"
        />
        <br />
        <label htmlFor="height">Tinggi (cm):</label>
        <input
          type="number"
          id="height"
          value={height} // Tambahkan value untuk controlled component
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Tinggi (cm)"
        />
        <br />
        <button onClick={handleCalculate}>Hitung BMI</button>
        <div id="result">{bmiResult && <p>BMI kamu segini king: {bmiResult}</p>}</div>

        <div id="results">
          {resultContent}
        </div>
      </div>
      <br />

      <div className="kritik-saran-section">
        {/* <h1>Kritik & Saran</h1>  Judul sudah ada di dalam komponen KritikSaranForm */}
        <KritikSaranForm /> {/* Menggunakan komponen form di sini */}
      </div>

      <style jsx>{`
        .homepage-container {
          padding: 20px;
          font-family: Poppins, sans-serif;
        }
        .bmi-calculator-section, .kritik-saran-section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        label {
          display: inline-block;
          min-width: 100px; /* Agar label sejajar */
          margin-bottom: 10px;
        }
        input[type="number"] {
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px 15px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #218838;
        }
        #result, #results {
          margin-top: 15px;
          font-weight: bold;
        }
        #results p {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;