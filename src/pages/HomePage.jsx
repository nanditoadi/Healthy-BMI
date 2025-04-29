// HomePage.jsx
import React, { useState } from 'react';

const HomePage = ({ calculateBMI, bmiResult }) => {
  // State untuk menyimpan input dari pengguna
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Event handler untuk menghitung BMI
  const handleCalculate = () => {
    calculateBMI(weight, height);
  };

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

  return (
    <div>
      <h2>BMI Calculator</h2>
      <label htmlFor="weight">Bobot (kg):</label>
      <input
        type="number"
        id="weight"
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Bobot (kg)"
      />
      <br />
      <label htmlFor="height">Tinggi (cm):</label>
      <input
        type="number"
        id="height"
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
        
      </div>
    </div>
  );
};

export default HomePage;