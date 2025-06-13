import React, { useState } from "react";
import { allCards, kingColors } from "@/data/allCards";
import { Card } from "@/types";
import clsx from "clsx";

const cardTypeIcons: Record<string, string> = {
  Base: "🏰",
  Troop: "⚔️",
  Tower: "🗼",
  Building: "🏛️",
  Tome: "📜",
  Enchantment: "✨",
};

interface CardDisplayProps {
  card: Card;
  className?: string;
}

function CardDisplay({ card, className }: CardDisplayProps) {
  const [showImageHover, setShowImageHover] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const kingColor =
    kingColors[card.kingId as keyof typeof kingColors] || "stone";

  const handleMouseEnter = () => {
    setShowImageHover(true);
  };

  const handleMouseLeave = () => {
    setShowImageHover(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const getOverlayPosition = () => {
    const overlayWidth = 208;
    const overlayHeight = 240;
    const margin = 16;

    let left = mousePosition.x + margin;
    let top = mousePosition.y - overlayHeight - margin;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left + overlayWidth > viewportWidth - margin) {
      left = mousePosition.x - overlayWidth - margin;
    }

    if (left < margin) {
      left = margin;
    }

    if (top < margin) {
      top = mousePosition.y + margin;
    }

    if (top + overlayHeight > viewportHeight - margin) {
      top = viewportHeight - overlayHeight - margin;
    }

    left = Math.max(
      margin,
      Math.min(left, viewportWidth - overlayWidth - margin)
    );
    top = Math.max(
      margin,
      Math.min(top, viewportHeight - overlayHeight - margin)
    );

    return { left, top };
  };

  return (
    <>
      <div
        className={clsx(
          `game-card p-4 bg-${kingColor}-800/30 hover:bg-${kingColor}-800/50 transition-all border border-${kingColor}-600/50`,
          className
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={card.assetPath}
              alt={card.name}
              className={`w-16 h-16 object-cover rounded border-2 border-${kingColor}-400 cursor-pointer`}
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder-card.jpg";
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3
                className={`text-lg font-bold text-${kingColor}-200 truncate`}
              >
                {card.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-lg border border-${kingColor}-400 bg-${kingColor}-800/40 text-${kingColor}-200`}
              >
                {cardTypeIcons[card.type]} {card.type}
              </span>
            </div>

            <p className="text-sm text-stone-300 mb-3 line-clamp-2">
              {card.description}
            </p>

            <div
              className={`inline-block px-2 py-1 text-xs rounded bg-${kingColor}-700/50 text-${kingColor}-300 mb-3 border border-${kingColor}-500/50`}
            >
              {card.kingId === "neutral"
                ? "⚪ Neutral"
                : card.kingId === "king-of-nothing"
                ? "⚪ King of Nothing"
                : card.kingId === "king-of-spells"
                ? "🔮 King of Spells"
                : card.kingId === "king-of-greed"
                ? "💰 King of Greed"
                : card.kingId === "king-of-blood"
                ? "🩸 King of Blood"
                : card.kingId === "king-of-nature"
                ? "🌿 King of Nature"
                : card.kingId === "king-of-stone"
                ? "🗿 King of Stone"
                : card.kingId === "king-of-progress"
                ? "⚙️ King of Progress"
                : card.kingId}
            </div>
          </div>
        </div>
      </div>

      {showImageHover && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: getOverlayPosition().left,
            top: getOverlayPosition().top,
          }}
        >
          <div
            className={`p-4 bg-${kingColor}-800/95 border-2 border-${kingColor}-400 rounded-lg shadow-2xl backdrop-blur-sm`}
          >
            <img
              src={card.assetPath}
              alt={card.name}
              className={`w-48 h-48 object-cover rounded-lg border-2 border-${kingColor}-400`}
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder-card.jpg";
              }}
            />
            <div
              className={`mt-2 text-center text-lg font-bold text-${kingColor}-100`}
            >
              {card.name}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function CardDatabase() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedKing, setSelectedKing] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const cardDatabase = allCards;

  const filteredCards = cardDatabase.filter((card: Card) => {
    const matchesType = selectedType === "all" || card.type === selectedType;
    const matchesKing = selectedKing === "all" || card.kingId === selectedKing;
    const matchesSearch =
      searchTerm === "" ||
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesKing && matchesSearch;
  });

  const cardTypes = [
    "all",
    ...Array.from(new Set(cardDatabase.map((card: Card) => card.type))),
  ];

  const kings = [
    "all",
    ...Array.from(new Set(cardDatabase.map((card: Card) => card.kingId))),
  ];

  const getKingDisplayName = (kingId: string) => {
    if (kingId === "all") return "📋 All Kings";
    if (kingId === "neutral") return "⚪ Neutral";
    if (kingId === "king-of-nothing") return "⚪ King of Nothing";
    if (kingId === "king-of-spells") return "🔮 King of Spells";
    if (kingId === "king-of-greed") return "💰 King of Greed";
    if (kingId === "king-of-blood") return "🩸 King of Blood";
    if (kingId === "king-of-nature") return "🌿 King of Nature";
    if (kingId === "king-of-stone") return "🗿 King of Stone";
    if (kingId === "king-of-progress") return "⚙️ King of Progress";
    return kingId;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nothing-300 mb-4">
          Card Database
        </h1>
        <p className="text-stone-300 mb-6">
          Browse all available cards from all kings, their stats, and abilities.
          Complete collection of {allCards.length} cards.
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search cards by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-stone-800 border border-stone-600 rounded-lg text-stone-100 placeholder-stone-400 focus:border-nothing-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {kings.map((kingId: string) => (
            <button
              key={kingId}
              onClick={() => setSelectedKing(kingId)}
              className={clsx(
                "px-4 py-2 rounded-lg border transition-colors duration-200 text-sm font-medium",
                selectedKing === kingId
                  ? "bg-nothing-600 border-nothing-400 text-white"
                  : "bg-stone-800 border-stone-600 text-stone-300 hover:border-nothing-500"
              )}
            >
              {getKingDisplayName(kingId)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {cardTypes.map((type: string) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={clsx(
                "px-4 py-2 rounded-lg border transition-colors duration-200 text-sm font-medium",
                selectedType === type
                  ? "bg-nothing-600 border-nothing-400 text-white"
                  : "bg-stone-800 border-stone-600 text-stone-300 hover:border-nothing-500"
              )}
            >
              {type === "all" ? "📋 All" : `${cardTypeIcons[type]} ${type}`}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-stone-400">
          Showing {filteredCards.length} of {cardDatabase.length} cards
          {selectedType !== "all" && ` (${selectedType} type)`}
          {selectedKing !== "all" &&
            ` from ${getKingDisplayName(selectedKing)}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {filteredCards.length > 0 ? (
        <div className="space-y-4">
          {filteredCards.map((card: Card) => (
            <CardDisplay key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-stone-400 mb-2">
            No cards found
          </h3>
          <p className="text-stone-500">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}

      <div className="mt-12 bg-stone-800/30 p-6 rounded-lg border border-stone-600">
        <h3 className="text-xl font-bold text-nothing-300 mb-4">
          📊 Database Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-300">
          <div>
            <h4 className="font-bold text-nothing-400 mb-2">Cards by King:</h4>
            <ul className="text-sm space-y-1">
              {kings
                .filter((k) => k !== "all")
                .map((kingId) => (
                  <li key={kingId}>
                    • {getKingDisplayName(kingId)}:{" "}
                    {cardDatabase.filter((c) => c.kingId === kingId).length}{" "}
                    cards
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-nothing-400 mb-2">Cards by Type:</h4>
            <ul className="text-sm space-y-1">
              {cardTypes
                .filter((t) => t !== "all")
                .map((type) => (
                  <li key={type}>
                    • {cardTypeIcons[type]} {type}:{" "}
                    {cardDatabase.filter((c) => c.type === type).length} cards
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
