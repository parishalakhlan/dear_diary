"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { WallpaperSelector } from "@/components/WallpaperSelector";
import { Navbar } from "@/components/NavbarForBoard";
import {
  getJournals,
  createJournal,
  Journal,
  deleteJournal,
  updateJournal,
} from "@/utils/api";
import toast from "react-hot-toast";
import { Search, Plus, EllipsisVertical, X, Edit, Trash2 } from "lucide-react";
import NextImage from "next/image";

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const fontOptions = [
  { id: "georgia", name: "Georgia" },
  { id: "comic", name: "Comic Sans" },
  { id: "cursive", name: "Cursive" },
  { id: "arial", name: "Arial" },
  { id: "times", name: "Times New Roman" },
];
// JournalCard component
interface JournalCardProps {
  entry: Journal;
  onEdit: (journal: Journal) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

const JournalCard: React.FC<JournalCardProps> = ({
  entry,
  onEdit,
  onDelete,
  deletingId,
}) => {
  const [expanded, setExpanded] = useState(false);
  // In the JournalCard component, change the menuRef declaration:
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-2xl p-6 relative w-full max-w-full sm:max-w-[450px] lg:max-w-[500px] transform transition-all duration-500 hover:shadow-[0_25px_60px_rgba(255,192,203,0.5)] hover:scale-[1.03] overflow-hidden"
      style={{ border: "2px solid #FFC0CB" }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-[#FFDAB9] to-[#FFB6C1] opacity-30 blur-2xl pointer-events-none z-0"></div>
      {/* Ellipsis menu button */}
      <div
        ref={menuRef}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer z-10"
      >
        <EllipsisVertical
          size={28}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#DDA0DD] hover:text-[#B565A7] transition-colors"
        />

        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-1 z-20 border border-gray-200 animate-fade-in">
            <button
              onClick={() => {
                onEdit(entry);
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Edit size={16} className="mr-2 text-blue-500" />
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(entry._id);
                setIsMenuOpen(false);
              }}
              disabled={deletingId === entry._id}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <Trash2 size={16} className="mr-2 text-red-500" />
              {deletingId === entry._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>

      <h3
        className={`text-2xl sm:text-3xl font-extrabold text-[#785A48] mb-4 pr-10 tracking-wide ${
          entry.font ? `font-${entry.font}` : "font-cursive"
        }`}
      >
        {entry.title}
      </h3>
      <p
        className={`text-gray-700 text-base sm:text-lg mb-6 leading-relaxed ${
          entry.font ? `font-${entry.font}` : "font-georgia"
        }`}
      >
        {expanded ? entry.content : truncateText(entry.content, 250)}
        {entry.content.length > 250 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#DDA0DD] ml-1 text-sm font-semibold hover:text-[#B565A7] transition-colors"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </p>
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          <span className="font-semibold text-[#A569BD]">Date:</span>{" "}
          {new Date(entry.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
    </motion.div>
  );
};
const FontSelector: React.FC<{
  selectedFont: string;
  onFontChange: (font: string) => void;
}> = ({ selectedFont, onFontChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose Font
      </label>
      <div className="flex flex-wrap gap-2">
        {fontOptions.map((font) => (
          <button
            key={font.id}
            type="button"
            onClick={() => onFontChange(font.id)}
            className={`px-3 py-1 rounded-full text-sm border transition-all ${
              selectedFont === font.id
                ? "bg-[#DDA0DD] text-white border-[#DDA0DD]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {font.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export const JournalLogic = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState("georgia");
  const [editFont, setEditFont] = useState("georgia");
  const fetchJournals = async () => {
    try {
      const data = await getJournals();
      setJournals(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch journals");
    }
  };

  // Fetch all journals on page load
  useEffect(() => {
    fetchJournals();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    try {
      await createJournal({ title, content, font: selectedFont });
      await fetchJournals();
      setTitle("");
      setContent("");
      setIsFormOpen(false);
      toast.success("Journal added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add journal");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteJournal(id);
      await fetchJournals();
      toast.success("Journal deleted!");
    } catch (err) {
      console.error("Error deleting journal", err);
      toast.error("Failed to delete journal");
    } finally {
      setDeletingId(null);
    }
  };

  // Start editing
  const startEditing = (journal: Journal) => {
    setEditingId(journal._id);
    setEditTitle(journal.title);
    setEditContent(journal.content);
    setEditFont(journal.font || "georgia");
    setIsFormOpen(true);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    setIsFormOpen(false);
  };

  // Save update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setUpdatingId(editingId);
    try {
      await updateJournal(editingId, {
        title: editTitle,
        content: editContent,
        font: editFont,
      });
      await fetchJournals();
      cancelEditing();
      toast.success("Journal updated!");
    } catch (err) {
      console.error("Error updating journal", err);
      toast.error("Failed to update journal");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleButtonClick = () => {
    setIsFormOpen(true);
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      setSelectedWallpaper(localStorage.getItem("wallpaper") || "");
    }
  }, []);

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTitle("");
    setContent("");
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleWallpaperSelect = (wallpaper: string) => {
    setSelectedWallpaper(wallpaper);
    localStorage.setItem("wallpaper", wallpaper); // persist choice
  };

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Navbar />
      <main
        className="flex-1 w-full relative pt-16 md:pt-20"
        style={{
          backgroundImage: selectedWallpaper
            ? `url(/wallpapers/${selectedWallpaper})`
            : undefined,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 4rem)",
        }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <NextImage
                src="/scrapbook.jpg"
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full w-12 h-12 sm:w-16 sm:h-16 shadow-lg"
              />
              <div className="flex flex-col items-start">
                <p
                  className="text-sm sm:text-base font-bold text-white"
                  style={{
                    textShadow: "0 0 3px black, 0 0 5px black, 0 0 8px black",
                  }}
                >
                  Parisha Lakhlan
                </p>
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white"
                  style={{
                    textShadow: "0 0 3px black, 0 0 5px black, 0 0 8px black",
                  }}
                >
                  My Journal
                </h1>
              </div>
            </div>
            <button
              onClick={handleButtonClick}
              className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 
             bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 
             text-white rounded-full 
             border-4 border-white 
             shadow-[0_0_30px_rgba(59,130,246,0.8),0_0_60px_rgba(34,211,238,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)]
             transition-all duration-300 ease-out
             transform hover:scale-125 hover:rotate-12 hover:-translate-y-2
             hover:shadow-[0_0_50px_rgba(59,130,246,1),0_0_100px_rgba(34,211,238,0.8),0_15px_35px_rgba(0,0,0,0.4)]
             active:scale-110 active:rotate-6
             before:absolute before:inset-0 before:rounded-full 
             before:border-2 before:border-cyan-300 before:animate-pulse
             after:absolute after:inset-0 after:rounded-full
             after:bg-gradient-to-br after:from-cyan-200/30 after:to-transparent
             focus:outline-none focus:ring-4 focus:ring-cyan-300/60
             group overflow-visible
             animate-bounce hover:animate-none"
              style={{
                filter:
                  "drop-shadow(0 0 25px rgba(34,211,238,0.9)) contrast(1.3) saturate(1.4)",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500 rounded-full opacity-80 blur-md animate-spin-slow"></div>

              {/* Main icon */}
              <Plus
                size={32}
                className="sm:w-10 sm:h-10 text-white relative z-10 drop-shadow-lg
               group-hover:text-cyan-100 transition-colors duration-300
               filter "
              />

              {/* Sparkle effects */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-300 rounded-full animate-ping"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-white rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce delay-700"></div>

              <span className="sr-only">Add Journal</span>
            </button>
          </div>

          <div className="mb-6 md:mb-8">
            <h3
              className="font-bold text-xl md:text-2xl mb-4"
              style={{
                color: "#FFFFFF",
                textShadow: `
      0.5px 0.5px 1px rgba(0, 0, 0, 0.8),
      -0.5px -0.5px 1px rgba(0, 0, 0, 0.8),
      0.5px -0.5px 1px rgba(0, 0, 0, 0.8),
      -0.5px 0.5px 1px rgba(0, 0, 0, 0.8),
      0 0 4px rgba(0, 0, 0, 0.9),
      0 0 8px rgba(0, 0, 0, 0.7)
    `,
                filter: "contrast(1.2) brightness(1.1)",
              }}
            >
              Choose a Wallpaper
            </h3>
            <WallpaperSelector
              wallpapers={[
                "scrapbook.jpg",
                "green_scrap.jpg",
                "soft_art.jpg",
                "mountains.jpg",
                "moon_sky.jpg",
                "hearts.jpg",
                "eyes_art.jpg",
                "day_sky.jpg",
                "butterflies.jpg",
                "blue_wallpaper.jpg",
                "bear.jpg",
                "abstract.jpg",

                "butterfly.jpg",
                "dark_art.jpg",
                "dunes.jpg",

                "flowers.jpg",
                "ghibli.jpg",
                "ghibli1.jpg",
                "ghibli2.jpg",
                "ghibli3.jpg",
                "giraaffe.jpg",
                "goat.jpg",
                "nature1.jpg",
                "pink_dune.jpg",
                "pink_place.jpg",
                "red.jpg",
                "train.jpg",
                "vintage.jpg",
              ]}
              selected={selectedWallpaper}
              onSelect={handleWallpaperSelect}
            />
          </div>

          {isFormOpen && (
            <form
              onSubmit={editingId ? handleUpdate : handleSubmit}
              className="w-full max-w-2xl mx-auto p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#FDF7F5] bg-opacity-90 backdrop-blur-md relative mb-8 transform transition-all duration-500 hover:scale-[1.02] border-4 border-[#FFB6C1] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#FFB6C1] to-[#E6A8D7] opacity-40 blur-3xl z-0 pointer-events-none"></div>

              <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center space-x-3">
                  <h3 className="text-3xl font-black text-[#8B4513] tracking-wider font-['Cursive']">
                    Dear Diary,
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleUpdate}
                      disabled={loading || updatingId === editingId}
                      className="bg-[#DDA0DD] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#B565A7] transition-transform duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updatingId === editingId ? "Updating..." : "Update"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="bg-[#FFE4E1] text-[#A9A9A9] p-2 rounded-full shadow-md hover:bg-[#FFDAB9] transition-colors"
                    aria-label="Close form"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="relative mb-6">
                <label htmlFor="journal-title" className="sr-only">
                  Journal Title
                </label>
                <input
                  id="journal-title"
                  type="text"
                  value={editingId ? editTitle : title}
                  onChange={(e) =>
                    editingId
                      ? setEditTitle(e.target.value)
                      : setTitle(e.target.value)
                  }
                  placeholder="Give your memory a sweet name..."
                  maxLength={100}
                  className="w-full text-2xl font-bold text-[#4B0082] bg-transparent border-b-2 border-[#FFC8DD] pb-2 focus:outline-none focus:border-[#E6A8D7] transition-colors placeholder-[#C0C0C0] font-['Comic_Sans_MS']"
                  required
                />
                <p className="text-right text-xs text-[#C0C0C0] mt-1">
                  {editingId ? editTitle.length : title.length}/100
                </p>
              </div>

              <FontSelector
                selectedFont={editingId ? editFont : selectedFont}
                onFontChange={(font) => {
                  if (editingId) {
                    setEditFont(font);
                  } else {
                    setSelectedFont(font);
                  }
                }}
              />
              <div className="relative mb-8">
                <label htmlFor="journal-content" className="sr-only">
                  Journal Content
                </label>
                <textarea
                  id="journal-content"
                  value={editingId ? editContent : content}
                  maxLength={3000}
                  onChange={(e) =>
                    editingId
                      ? setEditContent(e.target.value)
                      : setContent(e.target.value)
                  }
                  placeholder="Pour your heart out here..."
                  className="w-full text-lg text-[#556B2F] bg-transparent resize-none h-64 sm:h-80 md:h-96 focus:outline-none placeholder-[#C0C0C0] font-['Georgia']"
                  style={{ lineHeight: "1.75" }}
                  required
                />
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-[#FFB6C1] to-[#DDA0DD] rounded-full ml-2 opacity-50"></div>
              </div>

              <div className="flex justify-between items-center relative z-10">
                <div className="text-sm text-[#A9A9A9] font-medium">
                  <span className="font-bold text-[#8B4513]">Date:</span>{" "}
                  {new Date().toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                {!editingId && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#DDA0DD] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#B565A7] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                  >
                    {loading ? "Saving..." : "Save Entry"}
                  </button>
                )}
              </div>
            </form>
          )}

          {journals.length === 0 ? (
            <div className="text-center py-24 px-4 flex flex-col items-center justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 relative animate-float">
                <NextImage
                  src="/scrapbook.jpg"
                  alt="Empty journal"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full shadow-2xl border-4 border-[#F3E5AB] p-2"
                />
              </div>
              <p className="text-4xl md:text-5xl font-extrabold text-[#785A48] mb-4 tracking-tight font-['Cursive']">
                Right now, this is just white space.
              </p>
              <p className="text-base md:text-lg text-gray-500 mb-10 max-w-sm mx-auto font-['Georgia']">
                Add a rant, a love letter, or that random thought that kept you
                awake at 3 AM.
              </p>
              <button
                onClick={handleButtonClick}
                className="bg-gradient-to-r from-[#FFDAB9] to-[#FFC0CB] text-[#8B4513] px-12 py-5 rounded-full font-bold shadow-2xl hover:from-[#FFC0CB] hover:to-[#FFDAB9] transition-all transform hover:scale-105"
              >
                <Plus size={24} className="inline-block mr-2" />
                Start a New Entry
              </button>
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {journals.map((journal) => (
                <motion.div
                  key={journal._id}
                  variants={itemVariants}
                  className="w-full flex justify-center"
                >
                  <JournalCard
                    entry={journal}
                    onEdit={startEditing}
                    onDelete={handleDelete}
                    deletingId={deletingId}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white p-4 sm:hidden flex items-center justify-between space-x-3 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
            <div className="relative flex-grow max-w-xs">
              <input
                type="text"
                placeholder="Search web & PC"
                className="pl-10 pr-4 py-3 text-sm w-full rounded-full bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <motion.button
              className="bg-pink-600 text-white rounded-full p-3.5 shadow-lg hover:bg-pink-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              onClick={handleButtonClick}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={20} />
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
};
