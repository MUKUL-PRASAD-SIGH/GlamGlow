
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Neon Punk Color Palette
				neon: {
					pink: '#ff10f0',
					blue: '#00d4ff',
					green: '#39ff14',
					purple: '#bf00ff',
					orange: '#ff6600',
					yellow: '#ffff00',
					cyan: '#00ffff',
					magenta: '#ff00ff',
				},
				dark: {
					900: '#0a0a0f',
					800: '#1a1a2e',
					700: '#16213e',
					600: '#0f172a',
				},
				glow: {
					pink: 'rgba(255, 16, 240, 0.3)',
					blue: 'rgba(0, 212, 255, 0.3)',
					green: 'rgba(57, 255, 20, 0.3)',
					purple: 'rgba(191, 0, 255, 0.3)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'neon-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
					},
					'50%': {
						boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
					},
				},
				'glow': {
					'0%, 100%': {
						filter: 'brightness(1) drop-shadow(0 0 10px currentColor)',
					},
					'50%': {
						filter: 'brightness(1.2) drop-shadow(0 0 20px currentColor)',
					},
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)',
						opacity: '0',
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1',
					},
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'slide-in': 'slide-in 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
			},
			backgroundImage: {
				'neon-gradient': 'linear-gradient(135deg, #ff10f0, #00d4ff, #39ff14)',
				'dark-gradient': 'linear-gradient(135deg, #0a0a0f, #1a1a2e, #16213e)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
