var thee;
$('input.save').on('click', 
		function(e){
			thee = e;
			//logEntireEventObject(e);
			$.ajax({
				type: "POST",
				url: "/entries/Entry",
				data: {"Text": viewModel.Text(), "Tags": viewModel.Tags() }
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

	var viewModel = {};
	viewModel.Text = ko.observable("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
	viewModel.Tags = ko.observableArray();

	viewModel.Tags.push("hello");
	viewModel.Tags.push("world");
	viewModel.Tags.push("how");
	viewModel.Tags.push("are");
	viewModel.Tags.push("you");


	ko.applyBindings(viewModel);

	$('ul.taglist').append("<li class='taglist add'><span class='tagwrap'>ADD</span></li>");
