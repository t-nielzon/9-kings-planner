import { Link } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const [hoveredKing, setHoveredKing] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleKingMouseEnter = (kingId: string, e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setHoveredKing(kingId);
  };

  const handleKingMouseLeave = () => {
    setHoveredKing(null);
  };

  const handleKingMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const getOverlayPosition = () => {
    const maxOverlayWidth = 320;
    const maxOverlayHeight = 440;
    const margin = 16;

    let left = mousePosition.x + margin;
    let top = mousePosition.y - maxOverlayHeight - margin;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // adjust horizontal position to stay within viewport
    if (left + maxOverlayWidth > viewportWidth - margin) {
      left = mousePosition.x - maxOverlayWidth - margin;
    }

    if (left < margin) {
      left = margin;
    }

    // adjust vertical position to stay within viewport
    if (top < margin) {
      top = mousePosition.y + margin;
    }

    if (top + maxOverlayHeight > viewportHeight - margin) {
      top = viewportHeight - maxOverlayHeight - margin;
    }

    left = Math.max(
      margin,
      Math.min(left, viewportWidth - maxOverlayWidth - margin)
    );
    top = Math.max(
      margin,
      Math.min(top, viewportHeight - maxOverlayHeight - margin)
    );

    return { left, top };
  };

  const kingData = [
    {
      id: "king-of-nothing",
      name: "King of Nothing",
      image: "/assets/king-of-nothing-king.jpg",
      colorScheme: "nothing",
    },
    {
      id: "king-of-spells",
      name: "King of Spells",
      image: "/assets/king-of-spells-king.jpg",
      colorScheme: "spells",
    },
    {
      id: "king-of-greed",
      name: "King of Greed",
      image: "/assets/king-of-greed-king.jpg",
      colorScheme: "greed",
    },
    {
      id: "king-of-blood",
      name: "King of Blood",
      image: "/assets/king-of-blood-king.jpg",
      colorScheme: "blood",
    },
    {
      id: "king-of-nature",
      name: "King of Nature",
      image: "/assets/king-of-nature-king.jpg",
      colorScheme: "nature",
    },
    {
      id: "king-of-stone",
      name: "King of Stone",
      image: "/assets/king-of-stone-king.jpg",
      colorScheme: "stone",
    },
    {
      id: "king-of-progress",
      name: "King of Progress",
      image: "/assets/king-of-progress-king.jpg",
      colorScheme: "progress",
    },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-nothing-300 mb-6">
          9 Kings Strategic Planner
        </h1>
        <p className="text-xl text-stone-300 mb-12">
          Plan your kingdom layout, optimize your build paths, and master the
          strategic depth of 9 Kings with all cards from all kings available
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Link
            to="/planner"
            className="game-card card-nothing p-8 bg-nothing-800/30 hover:bg-nothing-800/50 transition-all group"
          >
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-xl font-bold text-nothing-200 mb-2">
              Kingdom Planner
            </h3>
            <p className="text-nothing-400">
              Design your kingdom layout with all cards available. Drag & drop
              grid planning with king selection for perks and decrees.
            </p>
          </Link>

          <Link
            to="/cards"
            className="game-card card-spells p-8 bg-spells-800/30 hover:bg-spells-800/50 transition-all group"
          >
            <div className="text-4xl mb-4">🃏</div>
            <h3 className="text-xl font-bold text-spells-200 mb-2">
              Card Database
            </h3>
            <p className="text-spells-400">
              Browse all cards from all kings, stats, and synergies. Complete
              collection with filtering by king and type.
            </p>
          </Link>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-nothing-300 mb-8">
            The 9 Kings
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {kingData.map((king) => (
              <div
                key={king.id}
                className={`bg-${king.colorScheme}-800/30 p-4 rounded-lg border border-${king.colorScheme}-600 group cursor-pointer hover:bg-${king.colorScheme}-800/50 transition-all`}
                onMouseEnter={(e) => handleKingMouseEnter(king.id, e)}
                onMouseLeave={handleKingMouseLeave}
                onMouseMove={handleKingMouseMove}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-${king.colorScheme}-700/50`}
                >
                  <img
                    src={king.image}
                    alt={king.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                <div
                  className={`text-${king.colorScheme}-200 font-bold text-sm`}
                >
                  {king.name}
                </div>
              </div>
            ))}

            <div className="bg-stone-800/30 p-4 rounded-lg border-2 border-dashed border-stone-500 group opacity-60">
              <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-stone-700/30 flex items-center justify-center">
                <div className="text-2xl text-stone-400">❓</div>
              </div>
              <div className="text-stone-400 font-bold text-sm">
                Coming Soon
              </div>
            </div>

            <div className="bg-stone-800/30 p-4 rounded-lg border-2 border-dashed border-stone-500 group opacity-60">
              <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-stone-700/30 flex items-center justify-center">
                <div className="text-2xl text-stone-400">❓</div>
              </div>
              <div className="text-stone-400 font-bold text-sm">
                Coming Soon
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-700">
          <h2 className="text-2xl font-bold text-nothing-300 mb-6">
            Acknowledgements
          </h2>

          <div className="text-stone-300 space-y-4">
            <div>
              <p className="mb-2">
                <strong className="text-nothing-200">
                  9 Kings Game Developer:
                </strong>{" "}
                <a
                  href="https://sadsocket.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spells-300 hover:text-spells-200 transition-colors underline"
                >
                  Sad Socket
                </a>
              </p>
              <p>
                <strong className="text-nothing-200">Planner Developer:</strong>{" "}
                <a
                  href="https://nielzontolentino.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spells-300 hover:text-spells-200 transition-colors underline"
                >
                  Nielzon Tolentino
                </a>{" "}
                (
                <a
                  href="https://github.com/t-nielzon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spells-300 hover:text-spells-200 transition-colors underline"
                >
                  github.com/t-nielzon
                </a>
                )
              </p>
            </div>

            <div className="text-sm text-stone-400 italic border-t border-stone-700 pt-4">
              <p>
                <strong>Disclaimer:</strong> The developer of this tool is not
                affiliated in any way with Sad Socket. 9 Kings is purely Sad
                Socket's creation, and this tool being a free, fan-made project.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* king image hover overlay */}
      {hoveredKing && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: getOverlayPosition().left,
            top: getOverlayPosition().top,
          }}
        >
          {(() => {
            const king = kingData.find((k) => k.id === hoveredKing);
            if (!king) return null;

            return (
              <div
                className={`p-4 bg-${king.colorScheme}-800/95 border-2 border-${king.colorScheme}-400 rounded-lg shadow-2xl backdrop-blur-sm`}
              >
                <img
                  src={king.image}
                  alt={king.name}
                  className={`max-w-xs max-h-96 w-auto h-auto object-contain rounded-lg border-2 border-${king.colorScheme}-400`}
                />
                <div
                  className={`mt-2 text-center text-lg font-bold text-${king.colorScheme}-100`}
                >
                  {king.name}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </>
  );
}
