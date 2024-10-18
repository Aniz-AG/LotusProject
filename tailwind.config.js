/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#200E3A',
      },
      backgroundImage: {
        'my-gradient': 'linear-gradient(to bottom, rgb(5, 46, 25) 0%, rgb(5, 56, 39) 80%)',
        'my-gradient-1': 'radial-gradient(circle, rgb(5, 56, 39) 0%, rgb(10, 66, 45) 50%, rgb(5, 46, 25) 100%)',
        'my-gradient-2': 'radial-gradient(circle, rgba(255, 165, 0, 1) 0%, rgba(255, 200, 0, 0.8) 50%, rgba(255, 255, 0, 0.6) 100%)',      },
    },  
  },
  plugins: [],
}

