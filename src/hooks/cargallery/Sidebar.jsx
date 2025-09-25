import React, { useState } from "react";
import { Home, Search, User, Palette, Video, Globe, Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const column1 = [
    { title: "Company" },
    { name: "About", path: "/About" },
    { name: "Blog", path: "/Blog" },
    { name: "Contact us", path: "/Contact" },
    { name: "Help Center", path: "/help" },
    { name: "Join our Team", path: "/Team" },

  ];
  const socialLinks = [
    { icon: <Twitter size={24} />, url: "https://twitter.com" },
    { icon: <Instagram size={24} />, url: "https://instagram.com" },
    { icon: <Facebook size={24} />, url: "https://facebook.com" },
  ];
  const column2 = [
    { title: "Gallery" },
    { name: "Ocean", path: "/ocean" },
    { name: "Forest", path: "/forest" },
    { name: "Desert", path: "/desert" },
    { name: "Sunset", path: "/sunset" },
  ];
  const column3 = [
    { title: "Trending" },
    { name: "Wildlife", path: "/wildlife" },
    { name: "Adventure", path: "/adventure" },
    { name: "Landscape", path: "/landscape" },
    { name: "Cities", path: "/cities" },
    { name: "Popular images", path: "/P_images" },
    { name: "Cartoons", path: "/Cartoons" },
    { name: "Coffee", path: "/Coffee" },




  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-16 bg-black flex flex-col justify-between py-6 z-50">
      {/* Top Icons */}
      <div className="flex flex-col items-center space-y-6">
        <Link to="/" className="text-white hover:text-red-500"><Home size={24} /></Link>
        <Link to="/search" className="text-white hover:text-red-500"><Search size={24} /></Link>
        <Link to="/ComingSoon" className="text-white hover:text-red-500"><User size={24} /></Link>
        <Link to="/CarIllustrations" className="text-white hover:text-red-500"><Palette size={24} /></Link>
        <Link to="/VideoGallery" className="text-white hover:text-red-500"><Video size={24} /></Link>
        <Link to="/ExploreEarth" className="text-white hover:text-red-500"><Globe size={24} /></Link>
      </div>

      {/* Hamburger Menu */}
      <div className="flex flex-col   items-center relative">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="text-white  hover:text-red-500"
        >
          <Menu size={24} />
        </button>

        {/* Drawer */}
        <div
          className={`fixed bottom-0 left-16 w-[40vw] max-w-4xl bg-white/90 backdrop-blur-md rounded-t-lg shadow-xl pb-15  pl-15 pr-5 transition-transform duration-300 ease-in-out
            ${openMenu ? "translate-y-0" : "translate-y-full"}
          `}
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          {/* Close Button */}
          <div className="flex pt-5 justify-end ">
            <button
              onClick={() => setOpenMenu(false)}
              className="text-black hover:text-red-500"
            >
              <X size={24} />
            </button>
          </div>

          {/* 3 Columns */}
          <div className="grid grid-cols-3   text-black">
            {[column1, column2, column3].map((column, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                {column.map((item) => (
                  <div>
                    <div className="text-2xl font-bold">

                      {item.title}
                    </div>
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setOpenMenu(false)} // Close drawer on click
                      className="text-gray-500 text-[15px]  hover:text-red-900 transition "
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>

            ))}
          </div>
          {/* Social Icons */}
          <div className="flex gap-6 ">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-red-900 transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
