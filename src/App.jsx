import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import HomePage from "./pages/HomePage"
import React, { useState } from 'react';

function App() {
  const [bmiResult, setBmiResult] = useState('');

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const heightInMeter = height / 100; // Mengonversi tinggi ke meter
      const bmi = weight / (heightInMeter * heightInMeter);
      setBmiResult(bmi.toFixed(2)); // Menyimpan hasil BMI
    } else {
      alert("Masukin tinggi sama bobot yang bener king");
    }
  };

  // const resultElement = document.getElementById('resultplus');
    
  //   // Add interpretation
  //   let interpretation = "";
  //   if (bmiResult < 18.5) {
  //   interpretation = "gepeng king";
  //   } else if (bmiResult >= 18.5 && bmiResult < 25) {
  //     interpretation = "keras normal king";
  //   } else {
  //     interpretation = "gendut king ntnt";
  //   }
    
  //   resultElement.innerHTML += `<br>kategori: ${interpretation}`;
  
  return <div>

  {/* Navbar */}
  <Navbar />

  {/* Content */}
  {/* <HomePage /> */}
  <HomePage calculateBMI={calculateBMI} bmiResult={bmiResult} />


  {/* Footer */}
  {/* <Footer /> */}
  </div>
}

export default App
