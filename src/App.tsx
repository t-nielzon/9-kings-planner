import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
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
        </div>
      </DndContext>
    </Router>
  );
}

export default App;
