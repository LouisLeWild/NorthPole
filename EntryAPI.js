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
				my.appendEntry(path, newEntry);
			}
		}
	}
},

my = {

	readData: function(path){
		var f,
			data
		try{
			f = fs.readFileSync(path, 'utf8');
			data = JSON.parse(f);

		}
		catch(e){		
			if(e.code == 'ENOENT' ){			
				my.initPath(path);
				f = fs.readFileSync(path, 'utf8');
				data = JSON.parse(f)
			}
			else{
				console.log("error:", e);
				throw(e);
			}
		}
		return data;
	},

	readEntries: function(path){
		var data = my.readData(path);
		return data.Entries;
	},

	readTags: function (path){
		var data = my.readData(path);
		return data.Tags;
	},

	appendEntry: function(path, entry){
		var knownTags = my.readTags(path),
		entries = my.readEntries(path),
		enteredTags = entry.Tags,
		newTags = []
		allTags = [];
		for(var t in enteredTags){
			if(knownTags.indexOf(enteredTags[t]) === -1){
				newTags.push(enteredTags[t]);
			}
		}
		allTags = knownTags.concat(newTags);
		entries.push(entry);
		my.writeData(path, { "Entries": entries, "Tags": allTags });
	},

	writeData: function(path, allEntries){
		fs.writeFileSync(path, JSON.stringify(allEntries, null, 2), 'utf8');
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
	},

	initPath: function(path){
		fs.writeFileSync(path, JSON.stringify({"Entries": [], "Tags": []}), 'utf8');
	}
};

module.exports = me;