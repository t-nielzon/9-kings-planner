import { useState, useRef, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import toast from "react-hot-toast";
import KingdomGrid from "@/components/KingdomGrid";
import { GridLayout, Card } from "@/types";
import { kingColors } from "@/data/allCards";
import clsx from "clsx";

interface SavedBuildPlan {
  id: string;
  name: string;
  gridLayout: GridLayout;
  created: Date;
}

// helper functions for URL-based sharing
const encodeBuildForURL = (
  gridLayout: GridLayout,
  name: string = "Shared Build Plan"
): string => {
  const buildData = {
    version: "1.0",
    name,
    gridLayout,
    exported: new Date().toISOString(),
  };
  const jsonString = JSON.stringify(buildData);
  return btoa(encodeURIComponent(jsonString));
};

const decodeBuildFromURL = (encodedData: string) => {
  try {
    const jsonString = decodeURIComponent(atob(encodedData));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to decode build data from URL:", error);
    return null;
  }
};

function DragOverlayCard({ card }: { card: Card }) {
  const kingColor =
    kingColors[card.kingId as keyof typeof kingColors] || "stone";

  return (
    <div
      className={clsx(
        "w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-32 border-2 rounded-lg shadow-2xl rotate-3 scale-105 opacity-90",
        `border-${kingColor}-400 bg-${kingColor}-800/30`
      )}
      style={{ touchAction: "none" }}
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<SavedBuildPlan | null>(null);

  const saveDialogRef = useRef<HTMLDivElement>(null);
  const loadDialogRef = useRef<HTMLDivElement>(null);
  const deleteDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSaveDialog && saveDialogRef.current) {
      setTimeout(() => {
        saveDialogRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 150);
    }
  }, [showSaveDialog]);

  useEffect(() => {
    if (showLoadDialog && loadDialogRef.current) {
      setTimeout(() => {
        loadDialogRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 150);
    }
  }, [showLoadDialog]);

  useEffect(() => {
    if (showDeleteDialog && deleteDialogRef.current) {
      setTimeout(() => {
        deleteDialogRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 150);
    }
  }, [showDeleteDialog]);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  // check for shared build in URL query params on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const buildParam = urlParams.get("build");

    if (buildParam) {
      const decodedBuild = decodeBuildFromURL(buildParam);
      if (decodedBuild && decodedBuild.gridLayout) {
        setGridLayout(decodedBuild.gridLayout);
        toast.success(
          `Shared build plan "${
            decodedBuild.name || "Imported Plan"
          }" loaded successfully!`
        );

        // clean up URL by removing the query parameter
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } else {
        toast.error(
          "Invalid build plan in URL. Please check the link and try again."
        );
      }
    }
  }, []);

  const [gridLayout, setGridLayout] = useState<GridLayout>(() => {
    const initialGrid: GridLayout = {
      currentSize: 5,
      unlockedPlots: [],
      plots: {},
    };

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
            unlockedYear: 27,
          };
        }
      }
    }

    return initialGrid;
  });

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

    setActiveCard(null);

    if (
      over &&
      active.data.current?.type === "card" &&
      over.data.current?.type === "plot"
    ) {
      const card = active.data.current.card;
      const position = over.data.current.position;

      const plotData = gridLayout.plots[position];
      if (plotData?.unlocked) {
        setGridLayout((prev) => ({
          ...prev,
          plots: {
            ...prev.plots,
            [position]: {
              ...prev.plots[position],
              cardId: card.id,
            },
          },
        }));
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
      toast.error("Please enter a name for your build plan");
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
    toast.success(`Build plan "${buildPlan.name}" saved successfully!`);
  };

  const handleSaveAttemptEmpty = () => {
    toast.error(
      "Build your kingdom first! Place some cards on the grid before saving."
    );
  };

  const handleLoadBuildPlan = (plan: SavedBuildPlan) => {
    setGridLayout(plan.gridLayout);
    setShowLoadDialog(false);

    setTimeout(() => {
      document.querySelector("h1")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

      setTimeout(() => {
        toast.success(`Build plan "${plan.name}" loaded successfully!`);
      }, 500);
    }, 200);
  };

  const handleDeleteBuildPlan = (planId: string) => {
    const updatedPlans = savedBuildPlans.filter((plan) => plan.id !== planId);
    setSavedBuildPlans(updatedPlans);
    localStorage.setItem("buildPlans", JSON.stringify(updatedPlans));
  };

  const handleConfirmDelete = () => {
    if (planToDelete) {
      handleDeleteBuildPlan(planToDelete.id);
      toast.success(`Build plan "${planToDelete.name}" deleted successfully!`);
      setShowDeleteDialog(false);
      setPlanToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setPlanToDelete(null);
  };

  const handleCopyToClipboard = async () => {
    try {
      const encodedBuild = encodeBuildForURL(gridLayout, "Shared Build Plan");
      const shareableURL = `${window.location.origin}${window.location.pathname}?build=${encodedBuild}`;

      await navigator.clipboard.writeText(shareableURL);
      toast.success(
        "Shareable link copied to clipboard! Anyone can click this link to load your build plan."
      );
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      toast.error("Failed to copy link to clipboard. Please try again.");
    }
  };

  const handleCopyAttemptEmpty = () => {
    toast.error(
      "Build your kingdom first! Place some cards on the grid before sharing."
    );
  };

  const placedCardsCount = Object.values(gridLayout.plots).filter(
    (plot) => plot.cardId
  ).length;
  const totalUnlockedPlots = gridLayout.unlockedPlots.length;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="max-w-full mx-auto px-2 sm:px-4">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-8 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-nothing-300 mb-4">
                Kingdom Grid Planner
              </h1>

              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="bg-stone-800/30 px-3 sm:px-4 py-2 rounded-lg border border-stone-600">
                  <span className="text-nothing-300 font-bold text-sm sm:text-base">
                    Unlocked Plots:{" "}
                  </span>
                  <span className="text-stone-300 text-sm sm:text-base">
                    {totalUnlockedPlots}
                  </span>
                </div>
                <div className="bg-stone-800/30 px-3 sm:px-4 py-2 rounded-lg border border-stone-600">
                  <span className="text-nothing-300 font-bold text-sm sm:text-base">
                    Cards Placed:{" "}
                  </span>
                  <span className="text-stone-300 text-sm sm:text-base">
                    {placedCardsCount}/{totalUnlockedPlots}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-800/20 border border-blue-600/50 rounded-lg p-3 sm:p-4 w-full lg:max-w-md xl:max-w-lg">
              <h4 className="font-bold text-blue-300 mb-2 text-sm sm:text-base">
                How to use:
              </h4>
              <ul className="text-xs sm:text-sm text-blue-200 space-y-1">
                <li>
                  • <strong>Drag</strong> cards from below onto unlocked plots
                </li>
                <li className="sm:hidden">
                  • <strong>Long press</strong> cards to drag on mobile
                </li>
                <li>
                  • <strong>Click</strong> on placed cards to remove them
                </li>
                <li>
                  • <strong>Click</strong> on dotted plots to unlock and expand
                  your kingdom
                </li>
                <li className="hidden sm:block">
                  • <strong>Hover</strong> over cards to see detailed
                  information
                </li>
                <li>
                  • <strong>Filter</strong> cards by king or type using the
                  dropdowns below
                </li>
                <li>
                  • <strong>Copy Shareable Link</strong> to share your build
                  plan with others
                </li>
              </ul>
            </div>
          </div>
        </div>

        <KingdomGrid
          gridLayout={gridLayout}
          onCardRemoved={handleCardRemoved}
          onPlotUnlock={handlePlotUnlock}
          onExpandAll={handleExpandAll}
          placedCardsCount={placedCardsCount}
          savedBuildPlansCount={savedBuildPlans.length}
          onClearGrid={handleClearGrid}
          onShowSaveDialog={() => setShowSaveDialog(true)}
          onShowLoadDialog={() => setShowLoadDialog(true)}
          onCopyToClipboard={handleCopyToClipboard}
          onSaveAttemptEmpty={handleSaveAttemptEmpty}
          onCopyAttemptEmpty={handleCopyAttemptEmpty}
          className="mb-8"
        />

        {/* Save Dialog */}
        {showSaveDialog && (
          <div
            className="bg-stone-900/90 border border-stone-500 rounded-lg p-4 mb-4"
            ref={saveDialogRef}
          >
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

        {showLoadDialog && (
          <div
            className="bg-stone-900/90 border border-stone-500 rounded-lg p-4 mb-4"
            ref={loadDialogRef}
          >
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
                          setPlanToDelete(plan);
                          setShowDeleteDialog(true);
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

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && planToDelete && (
          <div
            ref={deleteDialogRef}
            className="bg-stone-900/90 border border-stone-500 rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-bold text-nothing-300">
                Confirm Deletion
              </h4>
              <button
                onClick={handleCancelDelete}
                className="px-3 py-1 bg-stone-600 hover:bg-stone-500 text-white rounded border border-stone-400 text-sm"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-stone-300">
                Are you sure you want to delete the build plan{" "}
                <strong className="text-nothing-300">
                  "{planToDelete.name}"
                </strong>
                ?
              </p>

              <div className="bg-stone-800/50 p-3 rounded border border-stone-600">
                <div className="text-sm text-stone-400">
                  Created: {new Date(planToDelete.created).toLocaleDateString()}{" "}
                  at {new Date(planToDelete.created).toLocaleTimeString()}
                </div>
                <div className="text-sm text-stone-400">
                  Cards:{" "}
                  {
                    Object.values(planToDelete.gridLayout.plots).filter(
                      (plot) => plot.cardId
                    ).length
                  }{" "}
                  placed
                </div>
              </div>

              <p className="text-sm text-red-400">
                <strong>This action cannot be undone.</strong>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded border border-red-400 font-bold"
                >
                  Delete Build Plan
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 bg-stone-600 hover:bg-stone-500 text-white rounded border border-stone-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <DragOverlay>
        {activeCard ? <DragOverlayCard card={activeCard} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
