import NextImage from "next/image";
import { useState } from "react";
import { Plus, Save, X } from "lucide-react";

export function WallpaperSelector({
  wallpapers,
  selected,
  onSelect,
}: {
  wallpapers: string[];
  selected: string;
  onSelect: (file: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState(selected);

  const handleSave = () => {
    onSelect(tempSelection);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        {selected && (
          <NextImage
            src={`/wallpapers/${selected}`}
            alt="Selected wallpaper"
            width={100}
            height={100}
            className="w-24 h-24 object-cover border-4 border-blue-500 rounded cursor-pointer"
          />
        )}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <Plus size={32} />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Select Wallpaper</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {wallpapers.map((wp) => (
                  <div
                    key={wp}
                    className={`relative cursor-pointer rounded-lg overflow-hidden ${
                      tempSelection === wp
                        ? "ring-4 ring-blue-500"
                        : "ring-2 ring-gray-200"
                    }`}
                    onClick={() => setTempSelection(wp)}
                  >
                    <NextImage
                      src={`/wallpapers/${wp}`}
                      alt={wp}
                      width={100}
                      height={100}
                      className="w-full h-32 object-cover"
                    />
                    {tempSelection === wp && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-blue-500 rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              >
                <Save size={16} className="mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
