var extract = require('./prepare-lib/extract-deco')
var fix = require('./prepare-lib/fix-deco')

extract(function(json) {
	fix(json)
})
