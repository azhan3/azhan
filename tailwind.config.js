/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: "#c8e6f9",
        mountain: "#81c784",
        forest: "#4caf50",
        river: "#4db6ac",
        roots: "#6d4c41",
      },
      fontFamily: {
        display: ["'Poppins'", "'Segoe UI'", "sans-serif"],
        body: ["'Nunito'", "'Segoe UI'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 35px rgba(142, 202, 230, 0.35)",
      },
      animation: {
        "float-slow": "float 12s ease-in-out infinite",
        "float-medium": "float 8s ease-in-out infinite",
        "float-fast": "float 5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "river-flow": "riverFlow 14s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 0.9 },
          "50%": { opacity: 0.6 },
        },
        riverFlow: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-4%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "forest-noise": "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0, rgba(255,255,255,0) 55%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12) 0, rgba(255,255,255,0) 60%)",
      },
    },
  },
  plugins: [],
}

