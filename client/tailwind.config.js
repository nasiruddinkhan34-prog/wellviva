    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // This line scans your app for CSS classes
      ],
      theme: {
        extend: {
          fontFamily: {
            inter: ['Inter', 'sans-serif'], // Add Inter font
          },
        },
      },
      plugins: [
        require('@tailwindcss/forms'), // A plugin for better form styling
      ],
    };
    
