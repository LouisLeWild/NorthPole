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
			.done(function(res){ 
				console.log('processed post on /Entry'); 
				console.log(res); 
				console.log('that was the response'); 
				console.log({"Text": viewModel.Text(), "Tags": viewModel.Tags() });
				viewModel.Text(""); viewModel.Tags.removeAll();
			})
			.fail(function(){ console.log('failure post\'ing on /Entry');})
			.always(function(){ console.log('attempt to post on /Entry'); });
		});

function logEntireEventObject(e){
	for(p in e){
		console.log(p,":",e[p]);
	}	
}

var pushTag = function(tag){
	if(viewModel.Tags.indexOf(tag) === -1){
		viewModel.Tags.push(tag);
	}
}

	var viewModel = {};
	viewModel.Text = ko.observable("");
	viewModel.Tags = ko.observableArray();
	viewModel.TagOptions = ko.observableArray();

	ko.applyBindings(viewModel);
	var i;
	for(i=0;i<viewModel.Tags().length;i++){
		viewModel.Tags.pop();
	}

	$('ul.taglist').append("<li class='taglist add'><span class='tagwrap'>ADD</span></li>");

	$.ajax({
		type: "GET",
		url: "/entries/data/tags/"
	})
	.done(function(res){ for(var i =0; i<res.length;i++){viewModel.TagOptions.push(res[i]);} })
	.fail(function(){ console.log('falure getting on /tags'); })
	.always(function(){ console.log('attempt to get on /tags'); });

$('select.selecttags').on('change', function(e){
	pushTag($(this).val());
	this.selectedIndex = 0;
});	

$('li.add > span').on('click', function(e){ $('#newtag').toggleClass('hidden'); $('#newtagtext').focus(); });

$('input.done').on('click', function(e){ 
	viewModel.Tags.push( $('#newtagtext').val() ); 
	$('#newtagtext').val(""); 
	$('#newtag').toggleClass('hidden'); 
});