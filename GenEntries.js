var me = {
	randomEntry: function randomEntry(dateConfig, tagConfig, text){
		return {
			"CreateDate": my.randomDate(dateConfig),
			"Tags": my.randomTags(tagConfig),
			"Text": my.randomText(text)
		};
	}
},

my = {
	randomDate: function randomDate(config){
		var ranges = {   "YearHigh": 2050, "YearLow": 1950,
						"MonthHigh": 11,  "MonthLow": 0,
						  "DayHigh": 28,    "DayLow": 1 };
		if(config){
			for(p in config){
				ranges[p] = config[p];
				console.log(p  + " " + config[p]);
			}
		}
		return new Date( my.rnd(ranges.YearLow,ranges.YearHigh), my.rnd(ranges.MonthLow,ranges.MonthHigh), my.rnd(ranges.DayLow,ranges.DayHigh));
	},

	randomTag: function randomTag(config){
		var high = config || my.tags.length-1;
		return my.tags[ my.rnd(0, high) ];
	},	

	randomText: function randomText(config){
		return config || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	},	

	randomTags: function randomTags(config){
		var t = my.rnd(1,3);
		var r = [];
		for(var i = 0; i < t; i++){
			r.push(my.randomTag(config));
		}
		return r;
	},
	
	tags: ["Creative","Inspiration","Process Improvement","Effeciency","Rant","WTF","HR","Conversation","TODO","Reminder"],
	
	rnd: function rnd(low,high){
		return Math.floor( (Math.random() * (high-(low-1))) + low );
	}
};

module.exports = me;

/*
	dateConfig - object - override any of the ranges objects default properties 

	tagConfig - int - confine selection for first n elements of the tags array

	text - string - the test to be returned, defaults to ipsum
*/