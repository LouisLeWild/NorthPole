var express = require('express');
var router = express.Router();
var entry = require('../../EntryAPI');

router.get('/', function(req, res, next){
	var connection = entry.ConnectionTo('../SampleEntries.js');
	var allEntries = connection.AllEntries();
	res.render('allentries', {"entries": allEntries});
});

router.get(/\/\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}/, function(req, res, next){
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

router.get('/:tagname', function(req, res, next){ 
	var connection = entry.ConnectionTo('../SampleEntries.js'),

	entries = connection.EntriesByTag([req.params.tagname]);
	res.render('allentries', {"entries": entries});
});

router.get('/jk', function(req, res, next){
	res.send('i know you were just kidding that time!');
});

module.exports = router;