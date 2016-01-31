var jf = require('jsonfile')
var newCol = require('./colors')

module.exports = function(d) {
	var deco = extract(d)
	jf.writeFile('./data/deco.json', deco, function() {
		console.log('done')
	})
}


function getStyleArrayText(style) {
	var styles = style.split(';')
	var styleArray = []
	for(x=0;x<styles.length;x++) {
		if(styles[x].split(':').length === 2) {
			var key = styles[x].split(':')[0]
			var val = styles[x].split(':')[1]
			var o = {key: key, val: val}
			if(key === 'text-anchor' && val !== 'start') { styleArray.push(o) }
			else if(key === 'font-style' && val !== 'normal') { styleArray.push(o) }
			else if(key === 'text-align' && val !== 'start') { styleArray.push(o) }
		}
	}
	return styleArray
}

function getStyleArrayRect(style) {
	var styles = style.split(';')
	var styleArray = []
	for(x=0;x<styles.length;x++) {
		if(styles[x].split(':').length === 2) {
			var key = styles[x].split(':')[0]
			var val = styles[x].split(':')[1] 
			if(key === 'fill') { styleArray.push({key: key, val: newCol(val) }) }
		}
	}
	return styleArray
}

function getStyleArrayPath(style) {
	var styles = style.split(';')
	var all = {}
	var styleArray = []
	var fill = false
	var stroke = false
	for(x=0;x<styles.length;x++) {
		if(styles[x].split(':').length === 2) {
			var key = styles[x].split(':')[0]
			var val = styles[x].split(':')[1]
			var o = {key: key, val: val}
			all[key] = val
			if(key === 'fill' && val !== 'none') { fill = true }
			if(key === 'stroke' && val !== 'none') { stroke = true }
		}
	}

	if(fill === true) {
		styleArray.push({key: 'fill', val: newCol(all.fill)})
	} else {
		styleArray.push({key: 'fill', val: 'none'})
	}
	if(stroke === true) {
		styleArray.push({key: 'stroke', val: newCol(all.stroke)})
		styleArray.push({key: 'stroke-width', val: all['stroke-width']})
		if(all['stroke-dasharray'] !== 'none') {
			styleArray.push({key: 'stroke-dasharray', val: all['stroke-dasharray']})
		}
	} else {
		styleArray.push({key: 'stroke', val: 'none'})
	}
	return styleArray
}



function extract(d) {
	var all = []

	for(i=0;i<d.length;i++) {
		var s = {}
		var scene = d[i]
		s.id = scene.scene
		s.els = []
		for(j=0;j<scene.elements.length;j++) {
			if(scene.elements[j].name === 'path') {
				var el = {}
				el.name = 'path'
				el.d = scene.elements[j].attrib.d
				var styleString = scene.elements[j].attrib.style
				el.style = getStyleArrayPath(styleString)
				s.els.push(el)
			} else if(scene.elements[j].name === 'rect') {
				var el = {}
				el.name = 'rect'
				el.x = scene.elements[j].attrib.x
				el.y = scene.elements[j].attrib.y
				el.width = scene.elements[j].attrib.width
				el.height = scene.elements[j].attrib.height
				var styleString = scene.elements[j].attrib.style
				el.style = getStyleArrayRect(styleString)
				s.els.push(el)
			} else if(scene.elements[j].name === 'text') {
				var parts = scene.elements[j].childs
				if(parts !== undefined) {
					for(k=0;k<parts.length;k++) {
							var keep = true
							var el = {}
							el.name = 'text'
							el.x = parts[k].attrib.x
							el.y = parts[k].attrib.y
							var styleString = parts[k].attrib.style
							if(styleString === undefined) {
								styleString = scene.elements[j].attrib.style
							}
							el.style = getStyleArrayText(styleString)
							if(parts[k].childs === undefined) { 
								keep = false 
							} else {
								el.text = parts[k].childs[0]
							}
							if(keep === true) {
								s.els.push(el)
							}
					}
				}
			} else {
				console.log('forgot:', scene.elements[j].name)
			}
		}
		all.push(s)
	}

	return all

}
