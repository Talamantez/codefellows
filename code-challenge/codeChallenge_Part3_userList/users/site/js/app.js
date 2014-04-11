// site/js/app.js

var app = app || {};

app.Library = Backbone.Collection.extend({
	model: app.Book,
	url: '/api/books'
});

$().ready(function(){
	$(function(){
		$( '#releaseDate' ).datepicker();
		new app.LibraryView( books );
	});
});