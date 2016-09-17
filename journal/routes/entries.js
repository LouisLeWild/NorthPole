var express = require('express');
var router = express.Router();
var entry = require('../../EntryAPI');

router.get('/entries', function(res, res, next){
	var connection = entry.ConnectionTo('../SampleEntries.js');
	var allEntries = connection.AllEntries();
	res.render('allentries', {"entries": allEntries});
});

module.exports = router;