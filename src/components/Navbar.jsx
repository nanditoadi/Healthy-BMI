const Navbar = () => {
  return (
    <div className="navbar fixed w-full transition-all py-4">
      <div className="container mx-auto px-4">
        <div className="navbar-box flex items-center justify-between">
          <div className="logo flex items-center gap-3">
          <img src="/logonavbar.png" alt="Healthy BMI Logo" className="w-10 h-10 object-contain align-middle" />
            <h1 className="text-2xl font-bold">Healthy BMI</h1>
          </div>
          <ul className="flex flex-col gap-8 fixed left-0 top-1/2 -translate-y-1/2 px-8 py-6 rounded shadow-lg shadow-slate-300 bg-[#C7DEFF] font-bold text-black transition-all md:flex-row md:gap-12 md:static md:translate-y-0 md:top-0 md:left-0 md:w-auto md:h-auto md:p-0 md:m-0 md:shadow-none md:bg-transparent">
            <li>
              <a href="#"className="font-medium opacity-75">
                Beranda</a> 
            </li>
            <li>
              <a href="#"className="font-medium opacity-75">
                 Tentang BMI</a> 
            </li>
            <li>
              <a href="#"className="font-medium opacity-75">
                Cek BMI</a> 
            </li>
            <li>
              <a href="#"className="font-medium opacity-75">
                Kritik & Saran</a> 
            </li>

          </ul>
          <div className="Kontak">
            <a href="#" className="px-5 py-2 rounded-full text-black font-bold bg-[#C7DEFF] hover:bg-[#A6CBFF] transition-all" >Hubungi Kami</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
