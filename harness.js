var gener = require('./GenEntries.js');
var fs = require('fs');
var path = require('path');
var entry = require('./EntryAPI');

var repo = entry.ConnectionTo('./SampleEntries.js');
//console.log(repo.EntriesByDateRange('1/1/1960', '12/31/1969'));
//console.log(repo.EntriesByTag(['HR']));

//console.log(repo.EntriesByTagsAndDateRange(['Creative'], '1/1/1960', '12/31/1969'));

//repo.AddEntry("this is the new entry", ['new','improved']);



function initEntryFile(){

	var entries = [];
	for(var i=0;i<2;i++){
		entries.push(gener.randomEntry());
	}
	var data = { "entries": entries, "tags": [] };
	fs.writeFile('./SampleEntries.js', JSON.stringify(data, null, 2), function(err){ if(err){ console.log("Harness initEntryFile encountered err while writing.");} });
}

function createInitialEntries(){
	var newEntry,i;
	for(i=0; i<3; i++){
		newEntry = gener.randomEntry();
		repo.AddEntry(newEntry.Text, newEntry.Tags)
	}
}

createInitialEntries();