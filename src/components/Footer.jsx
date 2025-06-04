const Footer = () => {
  return (
    <div className="footer bg-white shadow mt-20" id="social">
      <div className="container mx-auto px-4 flex items-center justify-between">
      <p className="py-4">
        &copy; Copyright <span className="font-bold">Kelompok 5 RPL</span>
      </p>
      <div className="social-footer flex items-center sm:gap-7 gap-2">
        <i className="ri-instagram-fill text-2xl"></i>
        <i className="ri-youtube-fill text-2xl"></i>
        <i className="ri-linkedin-box-fill text-2xl"></i>
      </div>
      </div>

    </div>
  )
}

export default Footer