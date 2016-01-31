var fs = require('fs')
var Baby = require('babyparse')
var jf = require('jsonfile')


fs.readFile('./data/map.tsv', 'utf-8', function(err, data) {
	if(err) { console.log(err) }
	else {
		var json = []
		var parsed = Baby.parse(data).data
		var first = parsed[0]
		for(i=1;i<parsed.length - 1;i++) {
			var line = parsed[i]
			var obj = {}
			for(j=0;j<first.length;j++) {
				obj[first[j]] = line[j]
			}
			json.push(obj)
		}
		jf.writeFile('./data/map.json', json, function() {
			console.log('done')
		})
		
	}
})
