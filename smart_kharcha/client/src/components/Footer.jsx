import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-white/5 py-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-500 dark:text-slate-400 text-sm font-medium text-center md:text-left">
          &copy; {new Date().getFullYear()} Smart Kharcha. All rights reserved.
        </div>
        
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
          Made with <FaHeart className="text-rose-500 animate-pulse" /> by Utkarsh
        </div>

        <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
          <a href="https://github.com/utkarsh465/Smart_Kharcha" target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors" title="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="#" className="hover:text-brand-primary transition-colors" title="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-brand-primary transition-colors" title="LinkedIn">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
