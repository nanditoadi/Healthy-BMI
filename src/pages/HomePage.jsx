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
      <br />
      <div id='comment'>
        {interpretation && <p>{interpretation}</p>}
      </div>

      <div className="kritik-saran">
        <h1>Kritik & Saran</h1>
      </div>
    </div>
  );
};

export default HomePage;
