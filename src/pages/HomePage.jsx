import HeroImage from "../assets/coba.svg";
import AboutImage from "../assets/komponen orang.svg";
import orangsakitImage from "../assets/orang sakit.svg";
import { useState } from 'react';
import KritikSaranForm from './KritikSaranForm'; // Impor komponen form



const HomePage = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = (weight, height) => {
    // Convert height from cm to m
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    setBmiResult(bmi.toFixed(2));
  };

  const handleCalculate = () => {
    if (weight && height) {
      calculateBMI(weight, height);
    }
  };

  let resultContent;
  if (bmiResult < 18.5 && bmiResult > 0) {
    resultContent = (
      <div className="mt-6 p-6 bg-[#C7DEFF] rounded-xl shadow-inner">
        <p className="text-center font-reguler text-2xl text-black-800 mb-4"> <span className="font-bold text-000000">Berat Badan</span>  Anda <span className="font-bold text-000000 "> Kurang!</span></p>
        <div className="flex flex-row gap-4 items-start">
          {/* Kolom Teks */}
          <div className="w-7/12 prose prose-blue max-w-none">
            {/* Judul Utama disesuaikan dengan gambar */}
            <h2 className="font-reguler text-lg mb-3"> <span className="font-bold text-000000">Penjelasan</span> dan <span className="font-bold text-000000">Tips Nutrisi</span></h2>

            <p className="mb-5 text-base leading-relaxed"> <span className="font-bold text-000000">Berat Badan Kamu Kurang!</span> Wah, berat badan kamu di bawah batas normal! Tapi jangan khawatir, mari kita cari tahu penyebabnya dan cara menambah berat badan dengan cara yang sehat.</p>
            

            <div className="mb-5">
              <h3 className="font-semibold text-lg mb-2 text-black-700">Faktor Penyebab:</h3>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>Metabolisme tubuh yang cepat.</li>
                <li>Pola makan yang kurang kalori.</li>
                <li>Aktivitas fisik yang sangat tinggi.</li>
                <li>Masalah pencernaan atau penyerapan nutrisi.</li>
                <li>Efek samping obat-obatan tertentu.</li>
              </ul>
            </div>

            {/* Rekomendasi Pola Makan */}
            <div>
              <h3 className="font-semibold text-lg mb-2 text-black-700">Rekomendasi Pola Makan:</h3>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>Tambahkan 500-1000 kkal lebih banyak dari kebutuhan harian.</li>
                <li>Konsumsi lebih banyak karbohidrat kompleks: nasi, roti gandum, kentang, pasta.</li>
                <li>Perbanyak asupan lemak sehat: alpukat, minyak zaitun, kacang-kacangan.</li>
                <li>Pilih protein yang lebih padat kalori: daging sapi tanpa lemak, ayam, ikan, telur utuh, susu penuh lemak.</li>
                <li>Tambahkan camilan sehat: keju, yogurt, kacang-kacangan, smoothie buah dengan susu.</li>
              </ul>
            </div>
          </div>
          {/* Kolom Gambar */}
          <div className="w-5/12 flex flex-col gap-2">
            <img src={orangsakitImage} alt="Orang Sakit" className="w-64 mx-auto mt-4" />
          </div>
          
        </div>
      </div>
    );
  } else if (bmiResult >= 18.5 && bmiResult < 25) {
    resultContent = (
      <div className="mt-6 p-6 bg-blue-50 rounded-xl shadow-inner">
        <p className="text-center font-bold text-2xl text-blue-800 mb-4">Berat Badan Anda Normal!</p> {/* Judul disesuaikan dengan gambar */}
        <div className="prose prose-blue max-w-none">
          <h3 className="font-bold text-lg mb-3">Penjelasan dan Tips Nutrisi</h3> {/* Sub-judul disesuaikan */}
          <p className="mb-4"><strong>Anda Sehat Selamat! Status gizi anda dinyatakan sehat. Pertahankan dengan menerapkan pola hidup berikut:</strong></p>
          
          <h4 className="font-semibold mb-2">Isi Piringmu Seimbang:</h4>
          <p className="mb-4">50% sayur & buah, 50% makanan pokok & lauk pauk.</p>

          <h4 className="font-semibold mb-2">Makanan Pokok:</h4>
          <p className="mb-4">Sumber energi seperti nasi, jagung, kentang, ubi, roti, atau pasta.</p>
          
          <h4 className="font-semibold mb-2">Lauk Pauk:</h4>
          <ul className="list-disc pl-5 mb-4">
            <li><strong>Hewani:</strong> Daging, ayam, ikan, telur, susu.</li>
            <li><strong>Nabati:</strong> Tahu, tempe, kacang-kacangan.</li>
          </ul>

          <h4 className="font-semibold mb-2">Buah-buahan:</h4>
          <p className="mb-4">Sumber serat, vitamin, mineral, dan antioksidan alami.</p>

          <h4 className="font-semibold mb-2">Sayuran:</h4>
          <p className="mb-4">Kaya nutrisi, membantu detoksifikasi dan menjaga berat badan.</p>

          <h4 className="font-semibold mb-2">Aktivitas Fisik:</h4>
          <p className="mb-4">Bergerak minimal 30 menit setiap hari (jalan cepat, berkebun, bersih-bersih).</p>

          <h4 className="font-semibold mb-2">Cukupi Cairan:</h4>
          <p className="mb-4">Minum air putih minimal 8 gelas sehari.</p>

          <h4 className="font-semibold mb-2">Pantau Berat Badan:</h4>
          <p>Cek BMI secara rutin untuk mempertahankan kesehatan.</p>
        </div>
      </div>
    );
  } else if (bmiResult >= 25) {
    resultContent = (
      <div className="mt-6 p-6 bg-blue-50 rounded-xl shadow-inner">
        <p className="text-center font-bold text-2xl text-blue-800 mb-4">Berat Badan Anda Berlebih!</p>
        <div className="prose prose-blue max-w-none">
          <h3 className="font-bold text-lg mb-3">Penjelasan dan Tips Nutrisi</h3>
          <p className="mb-4"><strong>Oh no! Tapi jangan khawatir! Yuk kenali faktor penyebab dan mulai perbaiki pola makanmu:</strong></p>
          
          <h4 className="font-semibold mb-2">Faktor Penyebab:</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Konsumsi makanan tinggi gula dan lemak.</li>
            <li>Makan cepat saji dan makanan olahan.</li>
            <li>Kurang olahraga atau aktivitas fisik.</li>
            <li>Efek samping obat tertentu (antidepresan, steroid, dll).</li>
            <li>Kebiasaan begadang.</li>
            <li>Stres, depresi, atau trauma.</li>
          </ul>

          <h4 className="font-semibold mb-2">Rekomendasi Pola Makan:</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Kurangi 500-1000 kkal dari kebutuhan harian.</li>
            <li>Batasi karbohidrat kompleks: nasi, roti, kentang, jagung.</li>
            <li>Hindari karbohidrat sederhana: gula, sirup, kue manis, permen, minuman manis.</li>
            <li>Minimalkan lemak: hindari gorengan, santan kental, mentega, margarin.</li>
            <li>Prioritaskan protein rendah lemak: ikan, putih telur, ayam tanpa kulit, susu rendah lemak, tempe, tahu, kacang-kacangan.</li>
          </ul>
        </div>
      </div>
    );
  } else {
    resultContent = <p className="text-center mt-4">Hitung BMI Dulu King</p>
    ;
  }


  return (
    <div className="homepage pb-10">
      <div className="container mx-auto px-4">
        <div className="hero grid md:grid-cols-2 grid-cols-1 items-center gap-20 pt-32">
          <div className="box">
            <h1 className="lg:text-5xl/tight text-3xl font-medium mb-7">
              Cek <span className="font-bold text-000000 ">BMI</span> Sekarang
            </h1>
            <p className="text-base/8 mb-7 ">Temukan <span className="font-semibold text-000000">Rekomendasi Khusus untuk Anda</span></p>
            <a href="#cekbmi" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F9EC7D] to-[#F5B100] hover:opacity-90 shadow-[0_4px_20px_rgba(245,177,0,0.5)] tranisiton-all px-4 py-2 text-black font-semibold  shadow rounded-full w-auto ">
               Cek BMI Sekarang <i className="w-6 h-6 bg-black rounded-full flex items-center justify-center ri-arrow-right-wide-line text-white ms-1"></i>
            </a>
          </div>
          <div className="box">
            <img src={HeroImage} alt="HeroImage" className="md:w-[500px] w-[400px] mx-auto md:m-0"/>
          </div>
        </div>

        <div id="about" className="about grid md:grid-cols-2 grid-cols-1 items-center gap-17 pt-17 pt-32">
          <div className="box order-2 md:order-1 ">
            <h1 className="text-3xl md:text-4xl font-medium text-center md:text-left mb-6 -translate-y-6 md:-translate-y-10">
              Apa itu <span className="font-bold">BMI</span>?
            </h1>

            <div className="inline-block bg-[#C7DEFF] text-black font-bold px-6 py-3 rounded-3xl mb-7 text-lg">
              BMI (Body Mass Index)
            </div>

            <p className="text-base leading-relaxed text-justify mb-4">
            Body Mass Index (BMI) atau Indeks Massa Tubuh (IMT) adalah indikator pengukuran untuk memperkirakan berat badan ideal seseorang berdasarkan tinggi dan berat badannya, untuk mengetahui apakah berat badan seseorang termasuk normal, kurus, atau obesitas.
            </p>
            <p className="text-base leading-relaxed text-justify">
            Indeks BMI untuk mengukur status gizi dewasa yaitu usia diatas 18 tahun, basis perhitungannya BB(kg)/TB²(m). Sedangkan untuk mengukur status gizi anak dan remaja usia 0-18 tahun menggunakan indeks BMI/A (BMI for Age). BMI/A basis perhitungannya yaitu dengan Z-Score.
            </p>
          </div>
          <div className="box md:order-1 order-2">
            <img src={AboutImage} alt="About Image" className="lg:w-[230px] w-[150px] md:w-[220px] mx-auto"/>
          </div>
        </div>

        <div id="cekbmi" className="cekbmi pt-32">
          <div className="text-center">
            <h1 className="inline-block bg-[#C7DEFF] text-black font-bold px-6 py-3 rounded-3xl mb-7 text-lg">
            Kalkulator BMI
            </h1>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10 px-6 md:px-10">
          <p className="text-base md:text-lg leading-relaxed">
          <strong>Hitung Indeks Massa Tubuh (BMI)</strong> Anda dengan mudah untuk mengetahui status berat badan Anda. 
          Dengan informasi ini, Anda dapat lebih memahami kondisi tubuh Anda dan menentukan langkah-langkah kesehatan yang perlu diambil. 
          Cukup masukkan tinggi badan dan berat badan Anda untuk mengetahui hasilnya!</p>
          </div>
          <div className="flex justify-center items-center gap-20">
            {/* Box BMI Calculator */}
            <div className="bg-[#C7DEFF] rounded-3xl px-10 py-20 max-w-x1 mx-auto shadow-md mb-10">
              <div className="bg-white rounded-2xl p-6 shadow-md max-w-[23rem] w-full mx-auto" >
                <div className="flex justify-center gap-10 mb-6">
              </div>

                {/* Input tinggi */}
                <div className="mb-4">
                  <label className="block text-center font-bold mb-1">Tinggi (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Masukkan Tinggi"
                    className="w-full border-b-2 border-blue-400 p-2 text-center outline-none"
                  />
                </div>

                {/* Input berat */}
                <div className="mb-6">
                  <label className="block text-center font-bold mb-1">Berat (kg)</label>
                  <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    placeholder="Masukkan berat"
                    className="w-full border-b-2 border-blue-400 p-2 text-center outline-none"
                  />
                </div>

                {/* Tombol Hitung */}
                <button 
                  onClick={handleCalculate}
                  className="bg-gradient-to-r from-yellow-200 to-yellow-500 hover:opacity-90 shadow-md font-bold w-full py-2 rounded mb-6"
                >
                  HITUNG BMI
                </button>
            </div>
            <div>
                {/* Hasil */}
                <p className="text-center font-medium">Hasil <strong>BMI</strong> Anda:</p>
                <p className="text-center text-4xl font-bold">
                  {bmiResult || '00.00'}
                </p>
                <div className="text-center mt-2 ">
                  {resultContent}
                </div>
                </div>
            </div>
          </div>
        </div>
          <div id='kritiksaran' className=""><KritikSaranForm /> {/* Menggunakan komponen form di sini */}</div>
      </div>
    </div>
  );
};

export default HomePage;