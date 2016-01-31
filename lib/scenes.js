var d3 = require('d3')
var scenes = require('../data/scenes.json')
var deco = require('../data/deco.json')
var titleData = require('../data/titles.json')

var colorScale=d3.scale.linear()
	.domain([0,1,2,3,4,5,6,7,8,9,10,11,12])
	.range([
			"white",
			"#808080",
			"#bfe3cb",
			"#b8d1d9",
			"#6e9eab",
			"#e7bd92",
			"#ffdfbe",
			"#d5b4ca",
			"#e992ca",
			"#e6e6e6",
			"#ffc7be",
			"#e79d92",
			"#82c997"
])


module.exports = function(scene) {
	document.getElementById('deco').innerHTML = ''

	var sceneIndex = scene - 1
	var s = scenes[sceneIndex]
	if(scene > 9) { var col = 'clSc' + scene } else { var col = 'clSc0' + scene } 

	var titles = document.getElementById('titles')
	var opt = ''
	for(i=0;i<titleData.length;i++) {
		var x = titleData[i]
		if(x.s === scene) { var sel = 'selected' } else { var sel = '' }
		opt = opt + '<option value="' + x.s + '" ' + sel + '>' + x.t + '</option>'
	}
	titles.innerHTML = opt
	titles.onchange = function() {
		window.location.hash = '#' + titles.value
	}

	var mapGroup = d3.select('g#map')
	mapGroup.transition().duration(1000)
		.attr('transform', 'scale(' + s.scale + ') translate(' + s.x + ',' + s.y + ')')

	var map = mapGroup.selectAll('path')
	map.transition().duration(500).delay(500)
		.attr('fill', function(d) { return colorScale(d[col])})
		.attr('stroke', function(d) { return colorScale(d[col])})
		.attr('stroke-width', '0.05')

	setTimeout(function() {
		var decoElements = addDeco(deco[sceneIndex].els)
		document.getElementById('deco').innerHTML = decoElements
	},900)
}

function addDeco(els) {
	var str = ''
	for(i=0;i<els.length;i++) {
		var e = els[i]
		var styleString = ''
		for(j=0;j<e.style.length;j++) {
			styleString = styleString + e.style[j].key + ':' + e.style[j].val + ';'
		}

		if(e.name === 'path') {
			str = str 
				+ '<path d="' + e.d 
				+ '" style="' + styleString 
				+ '"></path>' 
		} else if(e.name === 'text') {
			str = str 
				+ '<text x="' + e.x 
				+ '" y="' + e.y 
				+ '" style="' + styleString + '">' 
				+ e.text + '</text>'
		} else if(e.name === 'rect') {
			str = str + '<rect x="' 
				+ e.x + '" y="' 
				+ e.y + '" width="' + e.width 
				+ '" height="' + e.height 
				+ '" style="' + styleString 
				+ '"></rect>'
		}

	}
	return str
}
