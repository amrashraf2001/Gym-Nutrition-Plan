/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('src/assets/test2.jpg')",
      },
    },
    },
    
    plugins: [
      require('daisyui'),
    ],
    daisyui: {
      themes: ["light", "dark"],
    },
    darkMode: ['selector', '[data-theme="dark"]'],
};
