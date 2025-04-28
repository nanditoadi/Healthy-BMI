import HeroImage from "../assets/coba.svg";
import AboutImage from "../assets/komponen orang.svg";



const HomePage = () => {
  return (
    <div className="homepage pb-10">
      <div className="container mx-auto px-4">
        <div className="hero grid md:grid-cols-2 grid-cols-1 items-center gap-20 pt-32">
          <div className="box">
            <h1 className="lg:text-5xl/tight text-3xl font-medium mb-7">
              Cek <span className="font-bold text-000000 ">BMI</span> Sekarang
            </h1>
            <p className="text-base/8 mb-7 ">Temukan <span className="font-semibold text-000000">Rekomendasi Khusus untuk Anda</span></p>
            <a href="#" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F9EC7D] to-[#F5B100] hover:opacity-90 shadow-[0_4px_20px_rgba(245,177,0,0.5)] tranisiton-all px-4 py-2 text-black font-semibold  shadow rounded-full w-auto ">
               Cek BMI Sekarang <i className="w-6 h-6 bg-black rounded-full flex items-center justify-center ri-arrow-right-wide-line text-white ms-1"></i>
            </a>
          </div>
          <div className="box">
            <img src={HeroImage} alt="HeroImage" className="md:w-[500px] w-[400px] mx-auto md:m-0"/>
          </div>
        </div>

        <div className="about grid md:grid-cols-2 grid-cols-1 items-center gap-16 pt-20 pt-32">
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
            <img src={AboutImage} alt="About Image" className="lg:w-[250px] w-[150px] md:w-[220px] mx-auto"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;