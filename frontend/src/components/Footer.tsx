import React from "react";
import { motion } from "framer-motion";
import { Mail, Globe, Heart } from "lucide-react";

// Define the type for a footer link
interface FooterLink {
  title: string;
  url: string;
}

// Define the type for a footer column
interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Define the type for the social link
interface SocialLink {
  icon: React.ElementType;
  url: string;
  label: string;
}

// Define the data for the footer content
const footerData: FooterColumn[] = [
  {
    title: "Product",
    links: [{ title: "Board", url: "#" }],
  },
  {
    title: "Company",
    links: [{ title: "About us", url: "/about" }],
  },
];

// Define the social links data
const socialLinks: SocialLink[] = [
  { icon: Mail, url: "mailto:yourmail@example.com", label: "Email" },
  { icon: Globe, url: "https://parishalakhlan.vercel.app/", label: "Website" },
];

// Main Footer component
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white text-gray-700 border-t border-gray-100"
    >
      {/* Main footer content */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center md:items-start"
            >
              {/* Logo */}
              <motion.a
                href="#"
                className="inline-flex items-center mb-1"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-lg font-bold text-gray-800">
                  <span className="text-purple-600">Day</span>
                  <span className="text-pink-600">Scribe</span>
                </span>
              </motion.a>

              {/* Tagline */}
              <p className="text-xs text-gray-500 text-center md:text-left mb-2">
                Empowering creativity through intuitive design
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={14} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex space-x-8"
            >
              {footerData.map((column, colIndex) => (
                <div key={colIndex} className="text-center md:text-right">
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">
                    {column.title}
                  </h4>
                  <ul className="space-y-1">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.url}
                          className="text-xs text-gray-600 hover:text-purple-600 transition-colors duration-200"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-3 border-t border-gray-100"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-xs text-gray-500 text-center md:text-left mb-2 md:mb-0">
                © {new Date().getFullYear()} DayScribe. All rights reserved.
              </div>
              <div className="flex items-center text-xs text-gray-500">
                Made with <Heart size={10} className="mx-1 text-red-400" /> for
                creators
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
