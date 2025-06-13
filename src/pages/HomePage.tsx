import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold text-nothing-300 mb-6">
        9 Kings Strategic Planner
      </h1>
      <p className="text-xl text-stone-300 mb-12">
        Plan your kingdom layout, optimize your build paths, and master the
        strategic depth of 9 Kings with all cards from all kings available
      </p>

      {/* Quick Actions */}
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

      {/* The 9 Kings with images */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-nothing-300 mb-8">
          The 9 Kings
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {/* Available Kings */}
          <div className="bg-nothing-800/30 p-4 rounded-lg border border-nothing-600 group">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-nothing-700/50">
              <img
                src="/assets/king-of-nothing-king.jpg"
                alt="King of Nothing"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="text-nothing-200 font-bold text-sm">
              King of Nothing
            </div>
          </div>

          <div className="bg-spells-800/30 p-4 rounded-lg border border-spells-600 group">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-spells-700/50">
              <img
                src="/assets/king-of-spells-king.jpg"
                alt="King of Spells"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="text-spells-200 font-bold text-sm">
              King of Spells
            </div>
          </div>

          <div className="bg-greed-800/30 p-4 rounded-lg border border-greed-600 group">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-greed-700/50">
              <img
                src="/assets/king-of-greed-king.jpg"
                alt="King of Greed"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="text-greed-200 font-bold text-sm">
              King of Greed
            </div>
          </div>

          <div className="bg-blood-800/30 p-4 rounded-lg border border-blood-600 group">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-blood-700/50">
              <img
                src="/assets/king-of-blood-king.jpg"
                alt="King of Blood"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="text-blood-200 font-bold text-sm">
              King of Blood
            </div>
          </div>

          <div className="bg-nature-800/30 p-4 rounded-lg border border-nature-600 group">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-nature-700/50">
              <img
                src="/assets/king-of-nature-king.jpg"
                alt="King of Nature"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="text-nature-200 font-bold text-sm">
              King of Nature
            </div>
          </div>

          <div className="bg-stone-800/30 p-4 rounded-lg border border-stone-600 group">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-stone-700/50">
              <img
                src="/assets/king-of-stone-king.jpg"
                alt="King of Stone"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="text-stone-200 font-bold text-sm">
              King of Stone
            </div>
          </div>

          <div className="bg-progress-800/30 p-4 rounded-lg border border-progress-600 group">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-progress-700/50">
              <img
                src="/assets/king-of-progress-king.jpg"
                alt="King of Progress"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="text-progress-200 font-bold text-sm">
              King of Progress
            </div>
          </div>

          {/* Coming Soon Kings */}
          <div className="bg-stone-800/30 p-4 rounded-lg border-2 border-dashed border-stone-500 group opacity-60">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-stone-700/30 flex items-center justify-center">
              <div className="text-2xl text-stone-400">❓</div>
            </div>
            <div className="text-stone-400 font-bold text-sm">Coming Soon</div>
          </div>

          <div className="bg-stone-800/30 p-4 rounded-lg border-2 border-dashed border-stone-500 group opacity-60">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-stone-700/30 flex items-center justify-center">
              <div className="text-2xl text-stone-400">❓</div>
            </div>
            <div className="text-stone-400 font-bold text-sm">Coming Soon</div>
          </div>
        </div>
      </div>

      {/* Acknowledgements Section */}
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
                href="https://sadsocket.cm"
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
  );
}
