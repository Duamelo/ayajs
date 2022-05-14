export default {
	input: "src/aya.js",
	plugins: [],
	output: [
		{
			format: "umd",
			name: "aya",
			file: "build/aya.js",
			indent: "\t"
		},
		{
			format: "es",
			file: "build/aya.module.js",
			indent: "\t"
		}
	]
};
