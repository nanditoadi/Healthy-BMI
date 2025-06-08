import { useEffect, useState } from "react";
import logonavbarImage from "../assets/logonavbar.png";


const Navbar = () => {
  const [show, setshow] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleClick = () => {
    setshow(!show);
    //console.log(show);
    //test
  };


  let menuActive = show ? "left-0" : "-left-full";


  useEffect(() =>(
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setScroll(true);
        setshow(false);
      } else {
        setScroll(false);
      }
    })
  ))

  let scrollActive = scroll ? "py-6 bg-white shadow" : "py-4";
  
  return (
    <div className={`navbar fixed w-full transition-all ${scrollActive}`}>
      <div className="container mx-auto px-4">
        <div className="navbar-box flex items-center justify-between">
          <div className="logo flex items-center gap-3">
          <img src={logonavbarImage} alt="Healthy BMI Logo" className="w-10 h-10 object-contain align-middle" />
            <h1 className="sm:text-2xl text-xl font-bold">Healthy BMI</h1>
          </div>
          <ul 
          className={`flex lg:gap-12 md:static flex-col gap-8 fixed ${menuActive} top-1/2 -translate-y-1/2 px-8 py-6 rounded shadow-lg shadow-slate-300 bg-[#C7DEFF] font-bold text-black transition-all md:flex-row md:gap-12 md:static md:translate-y-0 md:top-0 md:left-0 md:w-auto md:h-auto md:p-0 md:m-0 md:shadow-none md:bg-transparent`}>
            <li className="flex items-center gap-3">
              <i className="ri-home-5-line text-3xl md:hidden block"></i>
              <a href="#"className="font-medium opacity-75">
                Beranda</a> 
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-stack-line text-3xl md:hidden block"></i>
              <a href="#about" onClick={handleClick} className="font-medium opacity-75">
                 Tentang BMI</a> 
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-service-line text-3xl md:hidden block"></i>
              <a href="#cekbmi"className="font-medium opacity-75">
                Cek BMI</a> 
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-send-plane-2-line text-3xl md:hidden block "></i>
              <a href="#kritiksaran"className="font-medium opacity-75 ">
                Kritik & Saran</a> 
            </li>

          </ul>
          <div className="Kontak flex items-center gap-2">
            <a href="#social" className="px-5 py-2 rounded-full text-black font-bold bg-[#C7DEFF] hover:bg-[#A6CBFF] transition-all" >Hubungi Kami</a>
            <i className="ri-menu-line text-3xl md:hidden block" onClick={handleClick}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
