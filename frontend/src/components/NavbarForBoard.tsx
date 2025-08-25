"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, User, X, LogInIcon } from "lucide-react";

const navLinks = [
  { title: "Board", url: "/journals" },
  { title: "About", url: "/about" },
  { title: "Home", url: "/" },
];

const rightNavLinks = [
  { title: "Signup", icon: User, url: "#" },
  { title: "Profile", icon: User, url: "#" },
  { title: "Login", icon: LogInIcon, url: "#" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg font-sans px-4 md:px-8 py-3 ">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left section: Logo and Nav links */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {/* Logo container */}
                <div className="relative">
                  {/* Mobile version - DS only with gradient */}
                  <div className="flex items-center sm:hidden">
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                      DS
                    </span>
                  </div>

                  {/* Desktop version - DayScribe with gradient highlights */}
                  <div className="hidden sm:flex items-center">
                    <span className="text-2xl font-black tracking-tight">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                        D
                      </span>
                      <span className="text-gray-800">ay</span>
                      <span className="bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                        S
                      </span>
                      <span className="text-gray-800">cribe</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-6 text-sm font-medium">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-200 whitespace-nowrap relative group"
                  whileHover={{ y: -2 }}
                >
                  {link.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right section: Search bar and Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-3">
              {rightNavLinks.map((link, index) => (
                <motion.button
                  key={index}
                  className="p-2.5 rounded-full bg-gray-100/50 text-gray-600 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-200 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon && <link.icon size={14} className="mr-3" />}
                  {link.title}
                </motion.button>
              ))}
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-full bg-gray-100/50 backdrop-blur-sm text-gray-600"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/50"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-200/50">
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Navigation
                </h3>
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    className="block py-3 text-gray-800 hover:text-purple-600 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 8 }}
                  >
                    {link.title}
                  </motion.a>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Account
                </h3>
                {rightNavLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="flex items-center py-3 text-gray-800 hover:text-purple-600 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 8 }}
                  >
                    <link.icon size={18} className="mr-3" />
                    {link.title}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-gray-200/50">
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-full py-3 px-6 font-medium shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  New Project
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
