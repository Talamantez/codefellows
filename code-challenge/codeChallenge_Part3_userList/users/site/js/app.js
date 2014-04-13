// site/js/app.js

var app = app || {};

app.UserCollection = Backbone.Collection.extend({
	model: app.User,
	url: '/api/users'
});

$().ready(function(){
	$(function(){
		$( '#birthDate' ).datepicker();
		$('#updateBirthDate').datepicker();
		new app.UserCollectionView( users );
		
	});
});