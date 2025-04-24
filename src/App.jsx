import Navbar from "./components/navbar"
import Footer from "./components/footer"
import HomePage from "./pages/HomePage"

function calculateBMI() {
  // Get input values
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  
  // Validate inputs
  if (isNaN(weight)) {
    alert("Please enter a valid weight");
    return;
  }
  
  if (isNaN(height)) {
    alert("Please enter a valid height");
    return;
  }
  
  if (weight <= 0 || height <= 0) {
    alert("Weight and height must be positive numbers");
    return;
  }
  
  // Calculate BMI (weight in kg / height in meters squared)
  const heightInMeters = height / 100; // convert cm to meters
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // Display result
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `Your BMI is: ${bmi.toFixed(2)}`;
  
  // Add interpretation
  let interpretation = "";
  if (bmi < 18.5) {
    interpretation = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    interpretation = "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    interpretation = "Overweight";
  } else {
    interpretation = "Obese";
  }
  
  resultElement.innerHTML += `<br>Category: ${interpretation}`;
}


function App() {
  
  return <div>

  {/* Navbar */}
  <Navbar />

  {/* Content */}
  {/* <HomePage /> */}
  <h2>Healty-BMI</h2>
  <label htmlFor="weight"> bobot (kg)</label>
  <input type="number" id="weight" placeholder="masukkan bobot kg"></input>
  <br />
  <label htmlfor="height">tinggi (cm):</label>
  <input type="number" id="height" placeholder="masukkan tinggi cm"></input>
  <br />
  <button onclick="calculateBMI()">hitung BMI</button>
  <div id="result"></div>


  {/* Footer */}
  {/* <Footer /> */}
  </div>
}

export default App
