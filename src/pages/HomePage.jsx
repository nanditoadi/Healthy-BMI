
const HomePage = () => {
  return (
    <div>HomePage
        <h2>BMI Calculator</h2>
        <label for="weight">bobot (kg):</label>
        <input type="number" id="weight" placeholder="bobot (kg)"></input>
        <br />
        <label for="height">tinggi (cm):</label>
        <input type="number" id="height" placeholder="tinggi (cm)"></input>
        <label for="appt-time">Choose a time:</label>
        <input type="time" id="appt-time" name="appt-time"></input>
    </div>
    
  )
}

export default HomePage