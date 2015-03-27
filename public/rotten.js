$("input[name=title]").autocomplete({
	    select: function(node,data){
		function urlNextBlank(url){
		    // find the next url blank url field
		    // if one doesn't exist click the buton to create one
		    // add the url to it

		    var blank, fs = $.makeArray($("input[type=url]"));
		    for(var i = 0; i < fs.length; i++){
			console.log(fs[i]);
			if($(fs[i]).val() == ''){
			    $(fs[i]).val(url);
			    return;
			}
		    }
		    $("button[data-autoform-field=urls]").click();
		    setTimeout(
			function(){
			    $("input[type=url]").last().val(url);
			}, 200);
		}
		
		urlNextBlank(data.item.rturl);
		$("input[name=year]").val(data.item.year);
		if(data.item.imdb)
		    urlNextBlank('http://imdb.com/title/tt' + data.item.imdb);
	    },
	    source: function( request, response ) {
		$.ajax("http://api.rottentomatoes.com/api/public/v1.0/movies.json", {
		    data: {
			apikey: apikey,
			q: request.term
		    },
		    dataType: "jsonp",
		    success: function(data) {
			response($.map(data.movies, function(movie) {
			    var imdb;
			    if(movie.alternate_ids){
				imdb = movie.alternate_ids.imdb;
			    }
			    return {
				label: movie.title,
				value: movie.title,
				thumb: movie.posters.thumbnail,
				year: movie.year,
				rturl: movie.links.alternate,
				imdb: imdb
			    }
			}));           
		    }
		});
	    }
	}).data( "uiAutocomplete" )._renderItem = function( ul, item ) {
	    var img = $("<img>").attr("src", item.thumb);
	    var link = $("<a>").text(item.label).prepend(img);
	    return $("<li>")
		.data( "item.autocomplete", item )
		.append(link)
		.appendTo(ul);
	};	