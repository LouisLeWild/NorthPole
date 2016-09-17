var fs = require('fs'),

me = {
	ConnectionTo: function(path){
		var myPath = path;
		return {
			AllEntries: function(){
				return my.readData(path);
			},

			EntriesByTag: function(tags){
				return my.filter(path, my.predicates.byTags(tags) );
			},

			EntriesByDateRange: function(start, end){
				return my.filter(path, my.predicates.byDateRange(Date.parse(start), Date.parse(end)) );
			},

			EntriesByTagsAndDateRange: function(tags, start, end){
				var byTags = my.filter(path, my.predicates.byTags(tags));
				return my.filter(null, my.predicates.byDateRange(Date.parse(start), Date.parse(end)), byTags);
			}
		}
	}
},

my = {

	readData: function readData(path){
		var f = fs.readFileSync(path, 'utf8'),
		entries = JSON.parse(f);
		return entries;
	},

	filter: function(path, predicate, entries){
		var myEntries = entries || my.readData(path),
		filteredEntries = [];
		for(var e in myEntries){
			if(predicate(myEntries[e])){
				filteredEntries.push(myEntries[e]);
			}
		}
		return filteredEntries;		
	},

	predicates:{
		byTags: function(tags){ return function(entry){ for(var t in tags){ if(entry.Tags.indexOf(tags[t]) != -1){ return true;}  } }; },

		byDateRange: function(startDate, endDate){return function(entry){ return startDate <= Date.parse(entry.CreateDate) && Date.parse(entry.CreateDate) <= endDate; };}
	}
}

module.exports = me;