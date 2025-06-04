const Footer = () => {
  return (
    <div className="footer bg-white shadow mt-20" id="social">
      <div className="container mx-auto px-4 flex items-center justify-between">
      <p className="py-4">
        &copy; Copyright <span className="font-bold">Kelompok 5 RPL</span>
      </p>
      <div className="social-footer flex items-center sm:gap-7 gap-2">
        <a 
            href="https://www.instagram.com/tekom_undip?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank"
            rel="noopener noreferrer" 
            aria-label="Instagram Kelompok 5 RPL"
          >
        <i className="ri-instagram-fill text-2xl"></i>
        </a>
        <a 
          href="https://www.youtube.com/@teknikkomputerundip2345"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube Kelompok 5 RPL"
         >
        <i className="ri-youtube-fill text-2xl"></i>
        </a>
      </div>
      </div>

    </div>
  )
}

export default Footer