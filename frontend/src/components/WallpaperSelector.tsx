import NextImage from "next/image";
export function WallpaperSelector({
  wallpapers,
  selected,
  onSelect,
}: {
  wallpapers: string[];
  selected: string;
  onSelect: (file: string) => void;
}) {
  return (
    <div className="flex space-x-4">
      {wallpapers.map((wp) => (
        <NextImage
          key={wp}
          src={`/wallpapers/${wp}`}
          alt={wp}
          width={100}
          height={100}
          className={`w-24 h-24 object-cover border-4 rounded cursor-pointer ${
            selected === wp ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => onSelect(wp)}
        />
      ))}
    </div>
  );
}
