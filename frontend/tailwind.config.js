/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fef3e2',
                    100: '#fce4b6',
                    200: '#fad485',
                    300: '#f8c354',
                    400: '#f6b72f',
                    500: '#f4ab0a',
                    600: '#e89e09',
                    700: '#da8d07',
                    800: '#cc7d06',
                    900: '#b56003',
                },
                secondary: {
                    50: '#f5f3f0',
                    100: '#e6e1d9',
                    200: '#d6cdc0',
                    300: '#c5b9a7',
                    400: '#b8aa94',
                    500: '#ab9b81',
                    600: '#9a8a72',
                    700: '#847560',
                    800: '#6e614f',
                    900: '#504635',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            },
            boxShadow: {
                'elegant': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'elegant-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [],
}
