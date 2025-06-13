import React, { useState } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Card, GridLayout } from "@/types";
import { allCards, kingColors } from "@/data/allCards";
import clsx from "clsx";

interface KingdomGridProps {
  gridLayout: GridLayout;
  onCardRemoved: (position: string) => void;
  onPlotUnlock: (position: string) => void;
  onExpandAll: () => void;
  // build plan management props
  placedCardsCount: number;
  savedBuildPlansCount: number;
  onClearGrid: () => void;
  onShowSaveDialog: () => void;
  onShowLoadDialog: () => void;
  // clipboard functionality props
  onCopyToClipboard: () => void;
  className?: string;
}

interface GridPlotProps {
  position: string;
  plotData?: {
    cardId?: string;
    level: number;
    unlocked: boolean;
  };
  onCardRemoved: (position: string) => void;
  onPlotUnlock: (position: string) => void;
}

function GridPlot({
  position,
  plotData,
  onCardRemoved,
  onPlotUnlock,
}: GridPlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `plot-${position}`,
    data: {
      type: "plot",
      position,
    },
  });

  const handleClick = () => {
    if (plotData?.cardId) {
      onCardRemoved(position);
    } else if (plotData && !plotData.unlocked) {
      onPlotUnlock(position);
    }
  };

  const card = plotData?.cardId
    ? allCards.find((c) => c.id === plotData.cardId)
    : null;

  const kingColor = card
    ? kingColors[card.kingId as keyof typeof kingColors] || "stone"
    : "nothing";

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center relative",
        plotData?.unlocked
          ? card
            ? `border-${kingColor}-400 bg-${kingColor}-800/50 hover:bg-${kingColor}-700/50 cursor-pointer`
            : "border-nothing-400 bg-nothing-800/50 hover:bg-nothing-700/50"
          : "border-stone-600 border-dashed bg-stone-800/20 hover:bg-stone-700/30 cursor-pointer opacity-60",
        isOver &&
          plotData?.unlocked &&
          "border-blue-400 bg-blue-400/20 ring-2 ring-blue-400/50",
        !plotData?.unlocked &&
          isOver &&
          "border-yellow-400 bg-yellow-400/10 ring-1 ring-yellow-400/50"
      )}
      onClick={handleClick}
      style={{ touchAction: "manipulation" }}
    >
      {card ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-0.5 sm:p-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-0.5 sm:mb-1 overflow-hidden rounded border border-${kingColor}-300">
            <img
              src={card.assetPath}
              alt={card.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder-card.jpg";
              }}
            />
          </div>
          <div
            className={`text-xs text-${kingColor}-200 text-center truncate w-full leading-tight hidden sm:block`}
          >
            {card.name}
          </div>
        </div>
      ) : plotData?.unlocked ? (
        <div className="text-stone-400 text-xs text-center">
          <div className="mb-1">Empty</div>
          <div className="text-stone-500 hidden sm:block">{position}</div>
        </div>
      ) : (
        <div className="text-stone-500 text-xs text-center">
          <div className="text-lg mb-1">+</div>
          <div className="text-stone-600 hidden sm:block">Expand</div>
        </div>
      )}
    </div>
  );
}

interface CardTooltipProps {
  card: Card;
  isVisible: boolean;
  position: { x: number; y: number };
}

function CardTooltip({ card, isVisible, position }: CardTooltipProps) {
  if (!isVisible) return null;

  const kingColor =
    kingColors[card.kingId as keyof typeof kingColors] || "stone";

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: Math.min(position.x + 10, window.innerWidth - 400),
        top: Math.max(position.y - 10, 10),
        transform:
          position.y > window.innerHeight / 2 ? "translateY(-100%)" : "none",
      }}
    >
      <div
        className={`max-w-xs sm:max-w-2xl p-3 sm:p-6 bg-${kingColor}-800/95 border-2 border-${kingColor}-400 rounded-lg shadow-2xl backdrop-blur-sm`}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <div className="flex-shrink-0 self-center">
            <img
              src={card.assetPath}
              alt={card.name}
              className={`max-w-24 max-h-32 sm:max-w-xs sm:max-h-96 w-auto h-auto object-contain rounded-lg border-2 border-${kingColor}-400`}
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder-card.jpg";
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
              <h3
                className={`text-lg sm:text-xl font-bold text-${kingColor}-100`}
              >
                {card.name}
              </h3>
              <span
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg border border-${kingColor}-400 bg-${kingColor}-700/50 text-${kingColor}-200 font-medium self-start`}
              >
                {card.type}
              </span>
            </div>

            <p
              className={`text-sm sm:text-base text-${kingColor}-200 mb-4 leading-relaxed`}
            >
              {card.description}
            </p>

            <div
              className={`inline-block px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg bg-${kingColor}-700/50 text-${kingColor}-300 border border-${kingColor}-500/50 font-medium`}
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
    </div>
  );
}

interface DraggableCardProps {
  card: Card;
  className?: string;
}

function DraggableCard({ card, className }: DraggableCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `card-${card.id}`,
    data: {
      type: "card",
      card,
    },
  });

  const kingColor =
    kingColors[card.kingId as keyof typeof kingColors] || "stone";

  const handleMouseEnter = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={{ touchAction: "none" }}
        {...listeners}
        {...attributes}
        className={clsx(
          "w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-32 border-2 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200 select-none",
          `border-${kingColor}-400 bg-${kingColor}-800/30 hover:bg-${kingColor}-700/40 shadow-lg hover:shadow-xl`,
          isDragging && "opacity-30",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="w-full h-full flex flex-col p-1 sm:p-2">
          <div className="flex-1 mb-1 sm:mb-2 overflow-hidden rounded">
            <img
              src={card.assetPath}
              alt={card.name}
              className={`w-full h-full object-cover border border-${kingColor}-500/50`}
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder-card.jpg";
              }}
              draggable={false}
            />
          </div>

          <div
            className={`text-xs text-center font-bold text-${kingColor}-100 truncate leading-tight`}
          >
            {card.name}
          </div>
        </div>
      </div>

      <CardTooltip
        card={card}
        isVisible={showTooltip && !isDragging}
        position={mousePosition}
      />
    </>
  );
}

export default function KingdomGrid({
  gridLayout,
  onCardRemoved,
  onPlotUnlock,
  onExpandAll,
  placedCardsCount,
  savedBuildPlansCount,
  onClearGrid,
  onShowSaveDialog,
  onShowLoadDialog,
  onCopyToClipboard,
  className,
}: KingdomGridProps) {
  const generateGridPositions = (size: number): string[] => {
    const positions: string[] = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        positions.push(`${row},${col}`);
      }
    }
    return positions;
  };

  const gridPositions = generateGridPositions(gridLayout.currentSize);

  const [selectedKing, setSelectedKing] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredCards = allCards.filter((card) => {
    const kingMatch = selectedKing === "all" || card.kingId === selectedKing;
    const typeMatch = selectedType === "all" || card.type === selectedType;
    return kingMatch && typeMatch;
  });

  const uniqueKings = Array.from(new Set(allCards.map((card) => card.kingId)));
  const uniqueTypes = Array.from(new Set(allCards.map((card) => card.type)));

  const hasLockedPlots = Object.values(gridLayout.plots).some(
    (plot) => !plot.unlocked
  );

  return (
    <div className={clsx("flex flex-col gap-6 sm:gap-8", className)}>
      <div className="flex-1">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-nothing-300">
            Kingdom Layout
          </h2>
          <p className="text-nothing-500 text-sm sm:text-base">
            Drag cards onto unlocked plots or click dotted plots to expand your
            kingdom
          </p>
        </div>

        <div className="bg-stone-800/30 rounded-lg border border-stone-600 p-4 sm:p-8">
          <div
            className="grid gap-2 sm:gap-3 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${gridLayout.currentSize}, 1fr)`,
              width: "fit-content",
            }}
          >
            {gridPositions.map((position) => (
              <GridPlot
                key={position}
                position={position}
                plotData={gridLayout.plots[position]}
                onCardRemoved={onCardRemoved}
                onPlotUnlock={onPlotUnlock}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4 sm:mt-6">
            {hasLockedPlots && (
              <div className="bg-stone-900/80 px-3 sm:px-4 py-2 rounded-lg border border-stone-600">
                <span className="text-nothing-300 text-xs sm:text-sm font-bold">
                  Click on dotted plots to expand
                </span>
              </div>
            )}
            {hasLockedPlots && (
              <>
                <span className="text-stone-500 text-xs sm:text-sm hidden sm:inline">
                  or
                </span>
                <button
                  onClick={onExpandAll}
                  className="bg-nothing-600 hover:bg-nothing-500 text-white px-3 py-2 rounded-lg border border-nothing-400 text-xs sm:text-sm font-bold transition-colors duration-200"
                >
                  Expand All Plots
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
              className="btn-primary bg-red-600 hover:bg-red-500 border-red-400 text-xs sm:text-sm px-3 sm:px-4 py-2"
              onClick={onClearGrid}
              disabled={placedCardsCount === 0}
            >
              Clear All Cards ({placedCardsCount})
            </button>

            <button
              className="btn-primary bg-green-600 hover:bg-green-500 border-green-400 text-xs sm:text-sm px-3 sm:px-4 py-2"
              onClick={onShowSaveDialog}
              disabled={placedCardsCount === 0}
            >
              💾 Save Build Plan
            </button>

            <button
              className="btn-primary bg-blue-600 hover:bg-blue-500 border-blue-400 text-xs sm:text-sm px-3 sm:px-4 py-2"
              onClick={onShowLoadDialog}
              disabled={savedBuildPlansCount === 0}
            >
              📂 Load Build Plan ({savedBuildPlansCount})
            </button>

            <button
              className="btn-primary bg-purple-600 hover:bg-purple-500 border-purple-400 text-xs sm:text-sm px-3 sm:px-4 py-2"
              onClick={onCopyToClipboard}
              disabled={placedCardsCount === 0}
              title="Copy shareable link to clipboard"
            >
              🔗 Copy Shareable Link
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-stone-800/50 rounded-lg p-4 sm:p-6 border border-stone-600">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-nothing-300">
            Available Cards
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-stone-300 font-medium">
                King:
              </label>
              <select
                value={selectedKing}
                onChange={(e) => setSelectedKing(e.target.value)}
                className="bg-stone-700 border border-stone-600 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm text-stone-200 focus:border-nothing-400 focus:outline-none flex-1 sm:flex-none"
              >
                <option value="all">All Kings</option>
                {uniqueKings.map((king) => (
                  <option key={king} value={king}>
                    {king === "neutral"
                      ? "Neutral"
                      : king === "king-of-nothing"
                      ? "King of Nothing"
                      : king === "king-of-spells"
                      ? "King of Spells"
                      : king === "king-of-greed"
                      ? "King of Greed"
                      : king === "king-of-blood"
                      ? "King of Blood"
                      : king === "king-of-nature"
                      ? "King of Nature"
                      : king === "king-of-stone"
                      ? "King of Stone"
                      : king === "king-of-progress"
                      ? "King of Progress"
                      : king}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-stone-300 font-medium">
                Type:
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-stone-700 border border-stone-600 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm text-stone-200 focus:border-nothing-400 focus:outline-none flex-1 sm:flex-none"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-2 sm:gap-3">
          {filteredCards.map((card) => (
            <DraggableCard key={card.id} card={card} />
          ))}
        </div>
        <div className="mt-4 text-xs sm:text-sm text-stone-400">
          {filteredCards.length} of {allCards.length} cards shown
        </div>
      </div>
    </div>
  );
}
