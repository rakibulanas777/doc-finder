/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#0FCFEC",
					secondary: "#19D3AE",
					accent: "#3A4256",
					neutral: "#3d4451",
					"base-100": "#ffffff",
				},
			},
		],
	},
	// eslint-disable-next-line no-undef
	plugins: [require("daisyui")],
};
