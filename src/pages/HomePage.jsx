// HomePage.jsx
import React, { useState } from 'react';

const HomePage = ({ calculateBMI, bmiResult, interpretation }) => {
  // State untuk menyimpan input dari pengguna
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Event handler untuk menghitung BMI
  const handleCalculate = () => {
    calculateBMI(weight, height);
  };
}

  // komentar untuk tiap range bmi
  let resultContent;
  if (bmiResult < 18.5 && bmiResult > 0) {
    resultContent = <div>
      <p>Gepeng Banget King</p>
      <p>no ingfo krass</p>
      <p>Makan Yang Banyak King Ben Ora Gepeng nemen lhoh ntnt yakin</p>
      </div>;
  } else if (bmiResult >= 18.5 && bmiResult < 25){
    resultContent = <p>Keras Normal King</p>;
  } else if (bmiResult >= 25){
    resultContent = <p>Gendut King NTNT</p>
  } else {
    resultContent = <p>Hitung BMI Dulu King</p>
  }

  // event handler kirim form
  const FeedbackForm = () => {
    // State untuk menyimpan data input form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState(""); // Untuk menampilkan pesan status
  
    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validasi sederhana
      if (!name || !email || !feedback) {
        setMessage("Harap isi semua kolom!");
        return;
      }
  
      // Kirim data ke server menggunakan fetch atau axios
      const data = {
        name,
        email,
        feedback,
      };
  
      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          setMessage("Kritik dan saran Anda telah terkirim!");
          setName("");
          setEmail("");
          setFeedback("");
        } else {
          setMessage("Terjadi kesalahan, coba lagi nanti.");
        }
      } catch (error) {
        setMessage("Terjadi kesalahan jaringan.");
      }
    };

  return (
    <div>
      <h2>BMI Calculator</h2>
      <label htmlFor="weight">Bobot (kg):</label>
      <input
        type="number"
        id="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Bobot (kg)"
      />
      <br />
      <label htmlFor="height">Tinggi (cm):</label>
      <input
        type="number"
        id="height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Tinggi (cm)"
      />
      <br />
      <button onClick={handleCalculate}>Hitung BMI</button>
      <div id="result">{bmiResult && <p>BMI kamu segini king: {bmiResult}</p>}</div>

      <div id="results">
        {resultContent}
      </div>
      <br />

      <div className="kritik-saran">
        <h1>Kritik & Saran</h1>
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="name">Nama:</label>
          <br />
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nama' required/>
          <br />

          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required/>
          <br />

          <label htmlFor="feedback">Kritik dan Saran:</label>
          <br />
          <textarea name="feedback" id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} placeholder='Kritik dan Saran'required></textarea>
          <br />

          <button type="submit">Kirim</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default HomePage;