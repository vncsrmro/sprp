/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'sprp': {
                    'dark': '#0a0a0a',
                    'darker': '#050505',
                    'neon-blue': '#00d4ff',
                    'neon-gold': '#ffd700',
                    'neon-purple': '#a855f7',
                    'accent': '#1a1a2e',
                }
            },
            fontFamily: {
                'display': ['Orbitron', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'neon-flicker': 'neon-flicker 3s infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'neon-flicker': {
                    '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
                        textShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff',
                    },
                    '20%, 24%, 55%': {
                        textShadow: 'none',
                    },
                },
            },
            boxShadow: {
                'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
                'neon-gold': '0 0 20px rgba(255, 215, 0, 0.5)',
            }
        },
    },
    plugins: [],
}
