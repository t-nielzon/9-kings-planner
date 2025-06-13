import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import KingdomGrid from "@/components/KingdomGrid";
import { GridLayout, Card } from "@/types";
import { allCards, kingColors } from "@/data/allCards";
import clsx from "clsx";

// Simple saved build plan interface for localStorage
interface SavedBuildPlan {
  id: string;
  name: string;
  gridLayout: GridLayout;
  created: Date;
}

// Drag Overlay Card Component
function DragOverlayCard({ card }: { card: Card }) {
  const kingColor =
    kingColors[card.kingId as keyof typeof kingColors] || "stone";

  return (
    <div
      className={clsx(
        "w-24 h-32 border-2 rounded-lg shadow-2xl rotate-3 scale-105 opacity-90",
        `border-${kingColor}-400 bg-${kingColor}-800/30`
      )}
    >
      <div className="w-full h-full flex flex-col p-2">
        {/* Card Image */}
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

        {/* Card Name */}
        <div
          className={`text-xs text-center font-bold text-${kingColor}-100 truncate leading-tight`}
        >
          {card.name}
        </div>
      </div>
    </div>
  );
}

export default function GridPlanner() {
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [buildPlanName, setBuildPlanName] = useState("");
  const [savedBuildPlans, setSavedBuildPlans] = useState<SavedBuildPlan[]>(
    () => {
      const saved = localStorage.getItem("buildPlans");
      return saved ? JSON.parse(saved) : [];
    }
  );
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  // Initial 3x3 grid with center plot unlocked (for castle) but show 5x5 grid
  const [gridLayout, setGridLayout] = useState<GridLayout>(() => {
    const initialGrid: GridLayout = {
      currentSize: 5, // Always show 5x5 grid
      unlockedPlots: [],
      plots: {},
    };

    // Create all 5x5 plots but only unlock the initial 3x3
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const position = `${row},${col}`;
        const isInInitial3x3 = row >= 1 && row <= 3 && col >= 1 && col <= 3;

        if (isInInitial3x3) {
          initialGrid.unlockedPlots.push(position);
          initialGrid.plots[position] = {
            level: 1,
            unlocked: true,
            unlockedYear: 1,
          };
        } else {
          initialGrid.plots[position] = {
            level: 1,
            unlocked: false,
            unlockedYear: 27, // Can be unlocked during tower event
          };
        }
      }
    }

    return initialGrid;
  });

  const handleCardPlaced = (position: string, cardId: string) => {
    setGridLayout((prev) => ({
      ...prev,
      plots: {
        ...prev.plots,
        [position]: {
          ...prev.plots[position],
          cardId,
        },
      },
    }));
  };

  const handleCardRemoved = (position: string) => {
    setGridLayout((prev) => ({
      ...prev,
      plots: {
        ...prev.plots,
        [position]: {
          ...prev.plots[position],
          cardId: undefined,
        },
      },
    }));
  };

  const handlePlotUnlock = (position: string) => {
    setGridLayout((prev) => {
      const plotData = prev.plots[position];
      if (plotData && !plotData.unlocked) {
        const newUnlockedPlots = [...prev.unlockedPlots, position];
        return {
          ...prev,
          unlockedPlots: newUnlockedPlots,
          plots: {
            ...prev.plots,
            [position]: {
              ...plotData,
              unlocked: true,
            },
          },
        };
      }
      return prev;
    });
  };

  const handleExpandAll = () => {
    setGridLayout((prev) => {
      const newUnlockedPlots = [...prev.unlockedPlots];
      const newPlots = { ...prev.plots };

      // Unlock all currently locked plots
      Object.entries(prev.plots).forEach(([position, plot]) => {
        if (!plot.unlocked) {
          newUnlockedPlots.push(position);
          newPlots[position] = {
            ...plot,
            unlocked: true,
          };
        }
      });

      return {
        ...prev,
        unlockedPlots: newUnlockedPlots,
        plots: newPlots,
      };
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === "card") {
      setActiveCard(active.data.current.card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveCard(null); // Clear active card

    if (
      over &&
      active.data.current?.type === "card" &&
      over.data.current?.type === "plot"
    ) {
      const card = active.data.current.card;
      const position = over.data.current.position;

      // check if plot is unlocked
      const plotData = gridLayout.plots[position];
      if (plotData?.unlocked) {
        handleCardPlaced(position, card.id);
      }
    }
  };

  const handleClearGrid = () => {
    setGridLayout((prev) => ({
      ...prev,
      plots: Object.fromEntries(
        Object.entries(prev.plots).map(([position, plot]) => [
          position,
          { ...plot, cardId: undefined },
        ])
      ),
    }));
  };

  const handleSaveBuildPlan = () => {
    if (!buildPlanName.trim()) {
      alert("Please enter a name for your build plan");
      return;
    }

    const buildPlan: SavedBuildPlan = {
      id: Date.now().toString(),
      name: buildPlanName.trim(),
      gridLayout,
      created: new Date(),
    };

    const updatedPlans = [...savedBuildPlans, buildPlan];
    setSavedBuildPlans(updatedPlans);
    localStorage.setItem("buildPlans", JSON.stringify(updatedPlans));

    setBuildPlanName("");
    setShowSaveDialog(false);
    alert(`Build plan "${buildPlan.name}" saved successfully!`);
  };

  const handleLoadBuildPlan = (plan: SavedBuildPlan) => {
    setGridLayout(plan.gridLayout);
    setShowLoadDialog(false);
    alert(`Build plan "${plan.name}" loaded successfully!`);
  };

  const handleDeleteBuildPlan = (planId: string) => {
    const updatedPlans = savedBuildPlans.filter((plan) => plan.id !== planId);
    setSavedBuildPlans(updatedPlans);
    localStorage.setItem("buildPlans", JSON.stringify(updatedPlans));
  };

  const placedCardsCount = Object.values(gridLayout.plots).filter(
    (plot) => plot.cardId
  ).length;
  const totalUnlockedPlots = gridLayout.unlockedPlots.length;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="max-w-full mx-auto px-4">
        <div className="mb-6">
          <div className="flex justify-between items-start gap-8 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-nothing-300 mb-4">
                Kingdom Grid Planner
              </h1>

              {/* Simplified Grid Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-stone-800/30 px-4 py-2 rounded-lg border border-stone-600">
                  <span className="text-nothing-300 font-bold">
                    Unlocked Plots:{" "}
                  </span>
                  <span className="text-stone-300">{totalUnlockedPlots}</span>
                </div>
                <div className="bg-stone-800/30 px-4 py-2 rounded-lg border border-stone-600">
                  <span className="text-nothing-300 font-bold">
                    Cards Placed:{" "}
                  </span>
                  <span className="text-stone-300">
                    {placedCardsCount}/{totalUnlockedPlots}
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions moved to top right */}
            <div className="bg-blue-800/20 border border-blue-600/50 rounded-lg p-4 max-w-md lg:max-w-lg">
              <h4 className="font-bold text-blue-300 mb-2">How to use:</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>
                  • <strong>Drag</strong> cards from below onto unlocked plots
                </li>
                <li>
                  • <strong>Click</strong> on placed cards to remove them
                </li>
                <li>
                  • <strong>Click</strong> on dotted plots to unlock and expand
                  your kingdom
                </li>
                <li>
                  • <strong>Hover</strong> over cards to see detailed
                  information
                </li>
                <li>
                  • <strong>Filter</strong> cards by king or type using the
                  dropdowns above
                </li>
              </ul>
            </div>
          </div>
        </div>

        <KingdomGrid
          gridLayout={gridLayout}
          onCardPlaced={handleCardPlaced}
          onCardRemoved={handleCardRemoved}
          onPlotUnlock={handlePlotUnlock}
          onExpandAll={handleExpandAll}
          placedCardsCount={placedCardsCount}
          savedBuildPlansCount={savedBuildPlans.length}
          onClearGrid={handleClearGrid}
          onShowSaveDialog={() => setShowSaveDialog(true)}
          onShowLoadDialog={() => setShowLoadDialog(true)}
          className="mb-8"
        />

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="bg-stone-900/90 border border-stone-500 rounded-lg p-4 mb-4">
            <h4 className="text-lg font-bold text-nothing-300 mb-3">
              Save Build Plan
            </h4>
            <div className="flex gap-3">
              <input
                type="text"
                value={buildPlanName}
                onChange={(e) => setBuildPlanName(e.target.value)}
                placeholder="Enter build plan name..."
                className="flex-1 px-3 py-2 bg-stone-700 border border-stone-600 rounded text-stone-200 focus:border-nothing-400 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveBuildPlan();
                  if (e.key === "Escape") setShowSaveDialog(false);
                }}
                autoFocus
              />
              <button
                onClick={handleSaveBuildPlan}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded border border-green-400 font-bold"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 bg-stone-600 hover:bg-stone-500 text-white rounded border border-stone-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Load Dialog */}
        {showLoadDialog && (
          <div className="bg-stone-900/90 border border-stone-500 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-bold text-nothing-300">
                Load Build Plan
              </h4>
              <button
                onClick={() => setShowLoadDialog(false)}
                className="px-3 py-1 bg-stone-600 hover:bg-stone-500 text-white rounded border border-stone-400 text-sm"
              >
                Close
              </button>
            </div>

            {savedBuildPlans.length === 0 ? (
              <p className="text-stone-400">No saved build plans found.</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {savedBuildPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between bg-stone-800/50 p-3 rounded border border-stone-600"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-nothing-300">
                        {plan.name}
                      </div>
                      <div className="text-sm text-stone-400">
                        Created: {new Date(plan.created).toLocaleDateString()}{" "}
                        at {new Date(plan.created).toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-stone-400">
                        Cards:{" "}
                        {
                          Object.values(plan.gridLayout.plots).filter(
                            (plot) => plot.cardId
                          ).length
                        }{" "}
                        placed
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoadBuildPlan(plan)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded border border-blue-400 text-sm font-bold"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete build plan "${plan.name}"?`)) {
                            handleDeleteBuildPlan(plan.id);
                          }
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded border border-red-400 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Global Drag Overlay */}
      <DragOverlay>
        {activeCard ? <DragOverlayCard card={activeCard} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
