import { motion } from "framer-motion";

// Main component that renders the letter-based logo.
export default function Logo() {
  // Variants for the main logo container to orchestrate the animation.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  // Variants for each individual letter's animation.
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Split the name "DayScribe" into an array of letters.
  const logoLetters = "DayScribe".split("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      {/* This is the full "DayScribe" logo, which is visible on medium and larger screens.
        It is hidden on smaller screens using Tailwind's 'hidden' class.
      */}
      <motion.div
        className="hidden md:flex"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Map over the letters to animate each one. */}
        {logoLetters.map((letter, index) => {
          // Special styling for the 'D' and 'S' to make them stand out.
          const isHighlight = letter === "D" || letter === "S";

          return (
            <motion.span
              key={index}
              className={`
                text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans
                ${isHighlight ? "text-blue-400" : "text-gray-50"}
                ${isHighlight && "drop-shadow-lg"}
              `}
              variants={letterVariants}
              whileHover={{ scale: 1.1, rotate: isHighlight ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {letter}
            </motion.span>
          );
        })}
      </motion.div>

      {/* This is the abbreviated "DS" logo, which is only visible on small screens.
        It is hidden on medium and larger screens using Tailwind's 'md:hidden' class.
      */}
      <motion.div
        className="flex md:hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Render the 'D' */}
        <motion.span
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans text-blue-400 drop-shadow-lg"
          variants={letterVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          D
        </motion.span>
        {/* Render the 'S' */}
        <motion.span
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans text-blue-400 drop-shadow-lg"
          variants={letterVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          S
        </motion.span>
      </motion.div>
    </div>
  );
}
