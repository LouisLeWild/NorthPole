var thee;
$('input.save').on('click', 
		function(e){
			thee = e;
			//logEntireEventObject(e);
			$.ajax({
				type: "POST",
				url: "/entries/Entry",
				data: { "entry" : $('textarea', $(e.target.parentElement)).val() }
			})
			.done(function(res){ console.log('processed post on /Entry'); console.log(res); console.log('that was the response')})
			.fail(function(){ console.log('failure post\'ing on /Entry');})
			.always(function(){ console.log('attempt to post on /Entry');});
		});

function logEntireEventObject(e){
	for(p in e){
		console.log(p,":",e[p]);
	}	
}