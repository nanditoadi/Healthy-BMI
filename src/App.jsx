import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import React, { useState } from 'react';

function App() {
  const [bmiResult=0, setBmiResult] = useState('');

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const heightInMeter = height / 100; // Mengonversi tinggi ke meter
      const bmi = weight / (heightInMeter * heightInMeter);
      setBmiResult(bmi.toFixed(2)); // Menyimpan hasil BMI
    } else {
      alert("Masukin tinggi sama bobot yang bener king aku turu king");
    }
  };


  
  return <div>

  {/* Navbar */}
  <Navbar />

  {/* Content */}
  {/* <HomePage /> */}
  <HomePage calculateBMI={calculateBMI} bmiResult={bmiResult} />


  {/* Footer */}
  <Footer /> 
  </div>
}

export default App