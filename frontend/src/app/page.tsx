"use client"; // ✅ Needed because we'll use hooks (state, events)

import { useState, useEffect } from "react";

import { WallpaperSelector } from "@/components/WallpaperSelector";
import {
  getJournals,
  createJournal,
  Journal,
  deleteJournal,
  updateJournal,
} from "@/utils/api";
import toast from "react-hot-toast";
import next from "next";
export default function Home() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>(
    localStorage.getItem("wallpaper") || ""
  );

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
      await createJournal({ title, content });
      await fetchJournals();
      // add new at top
      setTitle("");
      setContent("");
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
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  // Save update
  const handleUpdate = async (id: string) => {
    setUpdatingId(id);
    try {
      await updateJournal(id, { title: editTitle, content: editContent });
      await fetchJournals();
      cancelEditing();
      toast.success("Journal updated!");
    } catch (err) {
      console.error("Error updating journal", err);
      toast.error("Failed to update journal");
    } finally {
      setEditingId(null);
    }
  };
  const handleWallpaperSelect = (wallpaper: string) => {
    setSelectedWallpaper(wallpaper);
    localStorage.setItem("wallpaper", wallpaper); // persist choice
  };

  return (
    <div
      className="max-w-2xl mx-auto p-6"
      style={{
        backgroundImage: selectedWallpaper
          ? `url(/wallpapers/${selectedWallpaper})`
          : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Dear Diary 📓</h1>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Choose a Wallpaper:</h3>
        <WallpaperSelector
          wallpapers={["scrapbook.jpg", "green_scrap.jpg"]}
          selected={selectedWallpaper}
          onSelect={handleWallpaperSelect}
        />
      </div>

      {/* Journal Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Journal Title"
          maxLength={100}
          className="w-full p-2 border rounded mb-3"
        />
        <p className="text-sm text-gray-400">{title.length}/50 characters</p>
        <textarea
          value={content}
          maxLength={3000}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full p-2 border rounded mb-3"
        />
        <p className="text-sm text-gray-400">{content.length}/500 characters</p>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Journal"}
        </button>
      </form>

      {/* Journal List */}
      {journals.length === 0 ? (
        <p className="text-gray-500">No journals found. Start writing one!</p>
      ) : (
        <ul className="space-y-4">
          {journals.map((j) => (
            <li key={j._id} className="p-4 border rounded-lg shadow-sm">
              {editingId === j._id ? (
                // Edit Mode
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    maxLength={100}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <p className="text-sm text-gray-400">
                    {title.length}/50 characters
                  </p>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    maxLength={3000}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <p className="text-sm text-gray-400">
                    {content.length}/500 characters
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(j._id)}
                      disabled={updatingId === j._id}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      {updatingId === j._id ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <h2 className="text-xl font-semibold">{j.title}</h2>
                  <p className="text-gray-700">{j.content}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(j.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-3 mt-2">
                    <button
                      onClick={() => startEditing(j)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(j._id)}
                      disabled={deletingId === j._id}
                      className="text-red-500 hover:text-red-700"
                    >
                      {deletingId === j._id ? "Deleting..." : "🗑️ Delete"}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
