/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    "extend": {
      "colors": {
        "blue-scale": {
          "50": "#eaf1f8",
          "100": "#d4e4f0",
          "200": "#aac9e1",
          "300": "#7fadd3",
          "400": "#5592c4",
          "500": "#2a77b5",
          "600": "#225f91",
          "700": "#19476d",
          "800": "#113048",
          "900": "#081824"
        }
      }
    }
  },
  plugins: [],
}

