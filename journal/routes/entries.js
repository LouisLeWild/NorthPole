var express = require('express');
var router = express.Router();
var entry = require('../../EntryAPI');

router.get('/', function(req, res, next){
	var connection = entry.ConnectionTo('../SampleEntries.js');
	var allEntries = connection.AllEntries();
	res.render('allentries', {"entries": allEntries});
});

router.get(/\/\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}/, function(req, res, next){
	var connection = entry.ConnectionTo('../SampleEntries.js');
	var path = req.path;
	var datesRegex = /(\d{4}-\d{2}-\d{2})\/(\d{4}-\d{2}-\d{2})/;
	var dates = path.match(datesRegex);
	var datePartRegex = /(\d{4})-(\d{2})-(\d{2})/;
	var startMatch = dates[1].match(datePartRegex);
	var endMatch = dates[2].match(datePartRegex);
	var start = new Date(startMatch[1], startMatch[2], startMatch[3]);
	var end = new Date(endMatch[1], endMatch[2], endMatch[3]);



	var entries = connection.EntriesByDateRange(start, end);
	res.render('allentries', {"entries": entries});
});

router.get('/jk', function(req, res, next){
	res.send('i know you were just kidding that time!');
});

module.exports = router;