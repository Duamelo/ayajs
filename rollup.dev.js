export default {
	input: "src/aya.js",
	external: [
		'jsdom',
	  ],
	  output: {
		globals: {
		  'jsdom': 'jsdom',
		},
	output: [
		{
			format: "umd",
			name: "aya",
			file: "build/aya.js",
			indent: "\t"
		}
	]
};
