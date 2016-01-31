var d3 = require('d3')
var data = require('./data/map.json')
var scenes = require('./lib/scenes')
var resize = require('./lib/resize')

window.onload = function() {
	window.config = {}

	var body = d3.select('body')
	var svg = body.append('svg')
		.attr({
			viewBox: '0 0 1000 500',
		})
	window.config.svg = svg

	var mapGroup = svg.append('g').attr('id','map')
	var decoGroup = svg.append('g').attr('id','deco')

	var map = mapGroup.selectAll('path')
		.data(data)
		.enter()
		.append('path')
		.attr('d', function(d) { return d.chemin })
		.attr('fill', 'white')
		.attr('stroke-width', 0)
	if(window.location.hash === '#1') {
		window.location.hash = ''
	}

	setTimeout(function() { 
		window.location.hash = 1
		resize()
	},10)

	var hammertime = new Hammer(document.body, {})
	hammertime.on('swipeleft', function() { next() })
	hammertime.on('swiperight', function() { prev() })

	document.body.addEventListener('keyup', function(e) {
		if(e.keyCode === 39) { next() }
		else if(e.keyCode === 37) { prev() }
	})

}


window.onresize = function() { 
	resize()
}

window.onhashchange = function() {
	var scene = +window.location.hash.split('#')[1]
	scenes(scene)
}

function next() {
		var current = +window.location.hash.split('#')[1]
		var s = current + 1
		if(s > 28) { s = 1 }
		window.location.hash = s
}

function prev() {
		var current = +window.location.hash.split('#')[1]
		var s = current - 1
		if(s < 1) { s = 28 }
		window.location.hash = s
}







