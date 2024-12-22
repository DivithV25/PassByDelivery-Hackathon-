module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enable dark mode using the "class" strategy
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Blue
        secondary: "#10B981", // Green
        accent: "#F59E0B", // Orange
        background: "#F9FAFB", // Light Gray
        darkBackground: "#121212", // Dark mode background
        darkText: "#E0E0E0", // Dark mode text
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        heading: ["Helvetica", "sans-serif"],
      },
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        gradient: "linear-gradient(135deg, #1E40AF, #10B981)",
      },
    },
  },
  plugins: [],
};