module.exports = function () {
	var titles = document.getElementById('titles')
	var titleH = titles.offsetHeight

	var h = window.innerHeight - (titleH + 5)
	var w = window.innerWidth

	if(w/h > 2) {
		var width = h * 2
		var height = h
	} else {
		var height = w / 2
		var width = w
	}

	window.config.width = width
	window.config.height = height

	var margin = (w - width) / 2 
	window.config.svg.attr({
		id: 'map',
		width: width,
		height: height,
		style: 'margin-left:' + margin + 'px'
	})
	titles.style.width = width
	titles.style['margin-left'] = margin + 'px'
}
