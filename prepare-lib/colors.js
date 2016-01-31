



module.exports = function(col) {
var original = [
			"white",
			"#464646",
			"#b2df8a",
			"#a6cee3",
			"#73a1c1",
			"#fbae5b",
			"#fdbf6f",
			"#cab2d6",
			"#967eac",
			"#dbdbdb",
			"#fb9a99",
			"#e96161",
			"#8ec18a"
		]
var latest = [
			"white",
			"#808080",
			"#bfe3cb",
			"#b8d1d9",
			"#6e9eab",
			"#e7bd92",
			"#ffdfbe",
			"#d5b4ca",
			"#cf82b4",
			"#e6e6e6",
			"#ffc7be",
			"#e79d92",
			"#82c997"
]


for(c=0;c<original.length;c++) {
	if(col === original[c]) { col = latest[c] }
}

return col
}
