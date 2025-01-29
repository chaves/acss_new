import type { Config } from "tailwindcss";
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import flowbitePlugin from 'flowbite/plugin'

const config: Config = {
	darkMode: ["class"],
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	safelist: ["dark"],

	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1200px',
			'2xl': '1400px'
		},
		container: {
			center: true,
			padding: '1rem'
		},
		fontFamily: {
			heading: ['Quicksand, sans-serif'],
			body: ['Montserrat, sans-serif']
		},
		boxShadow: {
			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
			DEFAULT: '0px 2px 4px rgba(148, 163, 184, 0.05), 0px 6px 24px rgba(235, 238, 251, 0.4)',
			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
			'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
			inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
			none: 'none'
		},
		fontSize: {
			xs: '.75rem',
			sm: '.875rem',
			tiny: '.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': ['2.25rem', '3.2rem'],
			'5xl': ['3rem', '4rem'],
			'6xl': ['4rem', '1rem'],
			'7xl': ['5rem', '1rem']
		},
		extend: {
			colors: {
				        // flowbite-svelte
			primary: {
				50: '#FFF5F2',
				100: '#FFF1EE',
				200: '#FFE4DE',
				300: '#FFD5CC',
				400: '#FFBCAD',
				500: '#FE795D',
				600: '#EF562F',
				700: '#EB4F27',
				800: '#CC4522',
				900: '#A5371B'
				},
				white: '#ffffff',
				body: '#1e293b',
				'blueGray-50': '#f8fafc',
				'blueGray-100': '#f1f5f9',
				'blueGray-200': '#e2e8f0',
				'blueGray-300': '#cbd5e1',
				'blueGray-400': '#94a3b8',
				'blueGray-500': '#64748b',
				'blueGray-600': '#475569',
				'blueGray-700': '#334155',
				'blueGray-800': '#1e293b',
				'blueGray-900': '#0f172a',
				blue: {
					light: '#85d7ff',
					DEFAULT: '#009eeb',
					dark: '#1573a1',
				},
				pink: {
					light: '#ff7ce5',
					DEFAULT: '#ff49db',
					dark: '#ff16d1',
				},
				gray: {
					darkest: '#1f2d3d',
					dark: '#3c4858',
					DEFAULT: '#c0ccda',
					light: '#e0e6ed',
					lightest: '#f9fafc',
				}
			},
			height: {
				128: '32rem'
			},
			important: true
		}
	},
  plugins: [flowbitePlugin, typography, forms, containerQueries]
};

export default config;
