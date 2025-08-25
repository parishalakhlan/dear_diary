import React from "react";
import { motion } from "framer-motion";
import { PenTool, Sparkles, BookOpen, Heart } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 overflow-hidden py-16 mt-10">
      {/* Decorative blobs - now placed relative to their container and sized responsively */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-pink-200/40 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-200/40 rounded-full blur-3xl animate-pulse animation-delay-2000 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md border border-pink-200 text-pink-500 text-xs sm:text-sm font-bold mb-6 sm:mb-8"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Journaling, but make it ✨ aesthetic
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Turn Emotional Damage
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent block">
            & Random Happy Thoughts
          </span>
          into Cute Pages
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-lg text-gray-600 max-w-lg mx-auto mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Because life’s not just chaos—it’s also cute. Write, laugh, cry,
          doodle, repeat. Your brain deserves an aesthetic diary.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none mx-auto justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg"
          >
            Start Journaling →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white border-2 border-pink-300 text-gray-700 font-semibold rounded-2xl shadow-md"
          >
            Browse Aesthetic Ideas
          </motion.button>
        </motion.div>

        {/* Cute features */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 max-w-5xl mx-auto w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {[
            {
              icon: PenTool,
              title: "Pretty Notes",
              desc: "Write your mess beautifully",
            },
            {
              icon: BookOpen,
              title: "Daily Chaos",
              desc: "Turn thoughts into stories",
            },
            {
              icon: Heart,
              title: "Mood Boost",
              desc: "Cry & smile on the same page",
            },
            {
              icon: Sparkles,
              title: "Aesthetic Vibes",
              desc: "Make your journal ✨cute✨",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 hover:shadow-xl transition"
            >
              <f.icon className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 mb-2 sm:mb-3" />
              <h3 className="text-gray-800 font-bold text-base sm:text-lg">
                {f.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Live fun footer */}
        <motion.div
          className="mt-12 sm:mt-16 text-xs sm:text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="mt-4">
            “Your thoughts called, they want a cuter home 📝”
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};
