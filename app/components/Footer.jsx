import React from "react";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>Jayoungh</span>
        <div className="socials flex flex-row gap-2">
          <a href="https://github.com/jayounghoyos" target="_blank" rel="noopener noreferrer">
            <img className="w-9 h-9" alt="Github Icon" src="images/github-icon.svg" />
          </a>
          <a href="https://www.instagram.com/juan_andres_young_hoyos/" target="_blank" rel="noopener noreferrer">
            <img className="w-9 h-9" alt="Instagram Icon" src="images/instagram.svg" />
          </a>
          <a href="https://www.linkedin.com/in/juan-andres-young-hoyos-9a3712236/" target="_blank" rel="noopener noreferrer">
            <img className="w-9 h-9" alt="Linkedin Icon" src="images/linkedin-icon.svg" />
          </a>
        </div>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
