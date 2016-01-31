var fs = require('fs')
var xml = require('node-xml-lite')
var jf = require('jsonfile')

module.exports = function(callback) {
	fs.readdir('./data/svg', function(err,files) {
		if(err) { console.log(err) }
		loop(0, files, [], function(json) {
			jf.writeFile('./data/deco-extract.json', json, function() {
				console.log('extracted')
				callback(json)
			})
		})
	})
}


function loop(count, files, json, callback) {
	if(count === files.length) { callback(json) }
	else {
		xml.parseFile('./data/svg/' + files[count], function(err, root){
			if(err) { console.log(err) }
			else {
				var obj = {
					scene: +files[count].split('.')[0],
					elements: []
				}
				var els = root.childs
				for(i=0;i<els.length;i++) {
					if(els[i].name === 'path' 
					|| els[i].name === 'line' 
					|| els[i].name === 'rect' 
					|| els[i].name === 'circle' 
					|| els[i].name === 'text') {
						obj.elements.push(els[i])
					}
				}
				json.push(obj)
				count = count + 1
				loop(count, files, json, callback)
			} 
		})
	}
}





