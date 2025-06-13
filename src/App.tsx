import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import GridPlanner from "./pages/GridPlanner";
import CardDatabase from "./pages/CardDatabase";
import Navigation from "./components/layout/Navigation";

function App() {
  return (
    <Router>
      <DndContext>
        <div className="min-h-screen bg-stone-900">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/planner" element={<GridPlanner />} />
              <Route path="/cards" element={<CardDatabase />} />
            </Routes>
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1c1917",
                color: "#f5f5f4",
                border: "1px solid #57534e",
              },
              success: {
                style: {
                  background: "#15803d",
                  color: "#f0fdf4",
                  border: "1px solid #16a34a",
                },
              },
              error: {
                style: {
                  background: "#dc2626",
                  color: "#fef2f2",
                  border: "1px solid #ef4444",
                },
              },
            }}
          />
        </div>
      </DndContext>
    </Router>
  );
}

export default App;
