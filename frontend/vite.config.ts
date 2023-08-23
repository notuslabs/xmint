import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import inject from '@rollup/plugin-inject';

const MODE = process.env.NODE_ENV;
const development = MODE === 'development';

export default defineConfig({
	plugins: [
		sveltekit(),
		development &&
			nodePolyfills({
				include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js'), 'http', 'crypto']
			})
	],
	resolve: {
		alias: {
			crypto: 'crypto-browserify',
			stream: 'stream-browserify',
			assert: 'assert',
			zlib: 'browserify-zlib'
		}
	},
	build: {
		rollupOptions: {
			external: ['@web3-onboard/*'],
			plugins: [
				nodePolyfills({ include: ['crypto', 'http'] }),
				inject({ Buffer: ['buffer', 'Buffer'] })
			]
		},
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},
	optimizeDeps: {
		exclude: ['@ethersproject/hash', 'wrtc', 'http'],
		include: [
			'@web3-onboard/core',
			'@web3-onboard/gas',
			'@web3-onboard/sequence',
			'js-sha3',
			'@ethersproject/bignumber'
		],
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis'
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
