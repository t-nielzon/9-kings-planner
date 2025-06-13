/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 9 Kings game-inspired color palette
        nothing: {
          50: "#f8f7f4",
          100: "#e8e5dc",
          200: "#d4cfc1",
          300: "#bcb4a0",
          400: "#a59982",
          500: "#8a7d66",
          600: "#71654f",
          700: "#5c5142",
          800: "#4d4439",
          900: "#413a32",
        },
        greed: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        blood: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        spells: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        nature: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        stone: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        progress: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        pixel: ["Courier New", "monospace"], // placeholder for pixel font
      },
      width: {
        108: "27rem", // Custom width for wider cards panel
      },
      animation: {
        "card-hover": "card-hover 0.2s ease-in-out",
        "grid-glow": "grid-glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "card-hover": {
          "0%": { transform: "translateY(0px) scale(1)" },
          "100%": { transform: "translateY(-4px) scale(1.02)" },
        },
        "grid-glow": {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" },
        },
      },
      backgroundImage: {
        "kingdom-pattern":
          'url(\'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23000" fill-opacity="0.05"%3E%3Cpath d="M0 0h20v20H0z"/%3E%3C/g%3E%3C/svg%3E\')',
      },
    },
  },
  plugins: [
    // Custom scrollbar plugin
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
        ".scrollbar-track-stone-800": {
          "&::-webkit-scrollbar-track": {
            "background-color": "#292524",
          },
        },
        ".scrollbar-thumb-stone-600": {
          "&::-webkit-scrollbar-thumb": {
            "background-color": "#57534e",
            "border-radius": "0.375rem",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            "background-color": "#44403c",
          },
        },
        ".scrollbar-thin::-webkit-scrollbar": {
          width: "8px",
        },
      });
    },
  ],
};
