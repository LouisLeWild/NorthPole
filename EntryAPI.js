var fs = require('fs'),

me = {
	ConnectionTo: function(path){
		var myPath = path;
		return {
			AllEntries: function(){
				return my.readEntries(path);
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
			},

			AddEntry: function(text, tags){
				var newEntry = my.generateEntry(new Date(), text, tags);
				var allEntries = my.readEntries(path);
				allEntries.push(newEntry);
				my.writeData(path, allEntries);
			}
		}
	}
},

my = {

	readEntries: function(path){
		var f = fs.readFileSync(path, 'utf8'),
		data = JSON.parse(f);
		return data.entries;
	},

	writeData: function(path, allEntries){
		fs.writeFileSync(path, JSON.stringify(allEntries), 'utf8');
	},

	generateEntry: function(createDate, text, tags){
		return {
			"CreateDate": createDate,
			"Tags": tags,
			"Text": text
		};
	},

	filter: function(path, predicate, entries){
		var myEntries = entries || my.readEntries(path),
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
};

module.exports = me;