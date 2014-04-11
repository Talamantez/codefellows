// site/js/models/book.js

var app = app || {};

app.Book = Backbone.Model.extend({
	parse: function( response ){
		response.id = response._id;
		console.log(response);
		return response;	
	},	
	defaults: {
		coverImage: 'img/placeholder.png',
		title: 'No title',
		author: 'Unknown',
		releaseDate: 'Unknown',
		keywords: 'None'
	}

	
});