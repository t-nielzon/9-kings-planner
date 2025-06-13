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
        "w-24 h-24 border-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center relative",
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
    >
      {card ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-1">
          <div className="w-16 h-16 mb-1 overflow-hidden rounded border border-${kingColor}-300">
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
            className={`text-xs text-${kingColor}-200 text-center truncate w-full leading-tight`}
          >
            {card.name}
          </div>
        </div>
      ) : plotData?.unlocked ? (
        <div className="text-stone-400 text-xs text-center">
          <div className="mb-1">Empty</div>
          <div className="text-stone-500">{position}</div>
        </div>
      ) : (
        <div className="text-stone-500 text-xs text-center">
          <div className="text-lg mb-1">+</div>
          <div className="text-stone-600">Expand</div>
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
        left: position.x + 10,
        top: position.y - 10,
        transform: "translateY(-100%)",
      }}
    >
      <div
        className={`w-96 p-6 bg-${kingColor}-800/95 border-2 border-${kingColor}-400 rounded-lg shadow-2xl backdrop-blur-sm`}
      >
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <img
              src={card.assetPath}
              alt={card.name}
              className={`w-32 h-32 object-cover rounded-lg border-2 border-${kingColor}-400`}
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder-card.jpg";
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h3 className={`text-xl font-bold text-${kingColor}-100`}>
                {card.name}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-lg border border-${kingColor}-400 bg-${kingColor}-700/50 text-${kingColor}-200 font-medium`}
              >
                {card.type}
              </span>
            </div>

            <p
              className={`text-base text-${kingColor}-200 mb-4 leading-relaxed`}
            >
              {card.description}
            </p>

            <div
              className={`inline-block px-3 py-2 text-sm rounded-lg bg-${kingColor}-700/50 text-${kingColor}-300 border border-${kingColor}-500/50 font-medium`}
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

  const style = undefined;

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
        style={style}
        {...listeners}
        {...attributes}
        className={clsx(
          "w-24 h-32 border-2 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200 select-none",
          `border-${kingColor}-400 bg-${kingColor}-800/30 hover:bg-${kingColor}-700/40 shadow-lg hover:shadow-xl`,
          isDragging && "opacity-30",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="w-full h-full flex flex-col p-2">
          <div className="flex-1 mb-2 overflow-hidden rounded">
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
    <div className={clsx("flex flex-col gap-8", className)}>
      <div className="flex-1">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-nothing-300">
            Kingdom Layout
          </h2>
          <p className="text-nothing-500">
            Drag cards onto unlocked plots or click dotted plots to expand your
            kingdom
          </p>
        </div>

        <div className="bg-stone-800/30 rounded-lg border border-stone-600 p-8">
          <div
            className="grid gap-3 mx-auto"
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

          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="bg-stone-900/80 px-4 py-2 rounded-lg border border-stone-600">
              <span className="text-nothing-300 text-sm font-bold">
                Click on dotted plots to expand
              </span>
            </div>
            {hasLockedPlots && (
              <>
                <span className="text-stone-500 text-sm">or</span>
                <button
                  onClick={onExpandAll}
                  className="bg-nothing-600 hover:bg-nothing-500 text-white px-3 py-2 rounded-lg border border-nothing-400 text-sm font-bold transition-colors duration-200"
                >
                  Expand All Plots
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center flex-wrap gap-4 mt-6">
            <button
              className="btn-primary bg-red-600 hover:bg-red-500 border-red-400"
              onClick={onClearGrid}
              disabled={placedCardsCount === 0}
            >
              Clear All Cards ({placedCardsCount})
            </button>

            <button
              className="btn-primary bg-green-600 hover:bg-green-500 border-green-400"
              onClick={onShowSaveDialog}
              disabled={placedCardsCount === 0}
            >
              💾 Save Build Plan
            </button>

            <button
              className="btn-primary bg-blue-600 hover:bg-blue-500 border-blue-400"
              onClick={onShowLoadDialog}
              disabled={savedBuildPlansCount === 0}
            >
              📂 Load Build Plan ({savedBuildPlansCount})
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-stone-800/50 rounded-lg p-6 border border-stone-600">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-nothing-300">
            Available Cards
          </h3>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-stone-300 font-medium">
                King:
              </label>
              <select
                value={selectedKing}
                onChange={(e) => setSelectedKing(e.target.value)}
                className="bg-stone-700 border border-stone-600 rounded px-3 py-1 text-sm text-stone-200 focus:border-nothing-400 focus:outline-none"
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
              <label className="text-sm text-stone-300 font-medium">
                Type:
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-stone-700 border border-stone-600 rounded px-3 py-1 text-sm text-stone-200 focus:border-nothing-400 focus:outline-none"
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

        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
          {filteredCards.map((card) => (
            <DraggableCard key={card.id} card={card} />
          ))}
        </div>
        <div className="mt-4 text-sm text-stone-400">
          {filteredCards.length} of {allCards.length} cards shown
        </div>
      </div>
    </div>
  );
}
