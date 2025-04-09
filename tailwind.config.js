module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color, #ff6b6b)", // Default, admin-changeable
        "background": "var(--background-color, #ffffff)", // Default white
        "text-light": "var(--text-light, #fff)",
        "text-dark": "var(--text-dark, #1f2937)", // Gray-800
      },
    },
  },
  plugins: [],
};