/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		container: {
			center: true,
			padding: '0',
			screens: {
				default: '1120px'
			}
		},
		extend: {
			colors: {
				mint: 'var(--mint)',
				'mint-transparent': 'var(--mint-transparent)',
				'mint-dark': 'var(--mint-dark)',
				'mint-darker': 'var(--mint-darker)',
				snow: 'var(--snow)',
				'snow-dark': 'var(--snow-dark)',
				'snow-darker': 'var(--snow-darker)',
				'dark-gray': 'var(--dark-gray)',
				'dark-gray-400': 'var(--dark-gray-400)',
				'dark-gray-500': 'var(--dark-gray-500)',
				'dark-gray-700': 'var(--dark-gray-700)',
				'dark-gray-900': 'var(--dark-gray-900)',
				'border-gray': 'var(--border-gray)',
				'border-gray-darker': 'var(--border-gray-darker)',
				muted: 'var(--text-muted)'
			},
			font: {
				sans: 'var(--font-sans)'
			},
			height: {
				navbar: 'var(--navbar-height)',
				content: 'var(--content-height)'
			},
			transitionTimingFunction: {
				'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
			}
		}
	},

	plugins: []
};

module.exports = config;
