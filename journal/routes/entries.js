var express = require('express');
var router = express.Router();
var entry = require('../../EntryAPI');

//root route ... test for now, not sure how i want to use it yet
router.get('/', function(req, res, next){
	console.log('entries root');
	var connection = entry.ConnectionTo('../SampleEntries.js');
	var allEntries = connection.AllEntries();
	res.render('allentries', {"entries": allEntries});
});

//get by date
router.get(/^\/\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}$/, function(req, res, next){
	console.log('entries date range');
	var connection = entry.ConnectionTo('../SampleEntries.js'),
	datesRegex = /(\d{4}-\d{2}-\d{2})\/(\d{4}-\d{2}-\d{2})/,
	datePartRegex = /(\d{4})-(\d{2})-(\d{2})/,
	path = req.path,
	datesMatch = path.match(datesRegex),
	startMatch = datesMatch[1].match(datePartRegex),
	endMatch = datesMatch[2].match(datePartRegex),
	start = new Date(startMatch[1], startMatch[2], startMatch[3]),
	end = new Date(endMatch[1], endMatch[2], endMatch[3]),

	entries = connection.EntriesByDateRange(start, end);
	res.render('allentries', {"entries": entries});
});

//get by date
router.get(/^\/[A-Za-z][A-Za-z0-9_]*$/i, function(req, res, next){ 
	console.log('entries tag', req.path);
	var connection = entry.ConnectionTo('../SampleEntries.js'),
	tagRegex = /^\/([A-Za-z][A-Za-z0-9_]*)$/i,
	tagMatch = req.path.match(tagRegex),
	tagname = tagMatch[1],
	
	entries = connection.EntriesByTag([tagname]);
	res.render('allentries', {"entries": entries});
});

//get by tag and date
router.get(/^\/[A-Za-z][A-Za-z0-9_]*\/\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}$/i, function(req, res, next){
	console.log('entries tag and date');
	var connection = entry.ConnectionTo('../SampleEntries.js');

	paramsRegex = /^\/([A-Za-z][A-Za-z0-9_]*)\/(\d{4}-\d{2}-\d{2})\/(\d{4}-\d{2}-\d{2})$/i,
	datePartRegex = /(\d{4})-(\d{2})-(\d{2})/,
	path = req.path,
	paramsMatch = path.match(paramsRegex),
	tagname = paramsMatch[1],
	startMatch = paramsMatch[2].match(datePartRegex),
	endMatch = paramsMatch[3].match(datePartRegex),
	start = new Date(startMatch[1], startMatch[2], startMatch[3]),
	end = new Date(endMatch[1], endMatch[2], endMatch[3]),

	entries = connection.EntriesByTagsAndDateRange([tagname], start, end);
	res.render('allentries', {"entries": entries});
});

router.post('/Entry', function(req, res, next){
console.log('/Entry (post)');
console.log(req.body);


	var connection = entry.ConnectionTo('../SampleEntries.js');
	connection.AddEntry(JSON.stringify(req.body["Text"]), req.body["Tags[]"]);
	res.send("back at ya");
});

module.exports = router;