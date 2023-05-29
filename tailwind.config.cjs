const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	daisyui: {
		themes: [
			{
				light: {
					primary: '#356388',
					secondary: '#dae7f1',
					accent: '#3c709a',
					neutral: '#0d1821',
					'base-100': '#edf3f8',
				}
			}
		]
	},

	plugins: [require('daisyui')]
};

module.exports = config;
