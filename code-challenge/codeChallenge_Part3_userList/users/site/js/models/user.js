// site/js/models/user.js

var app = app || {};

app.User = Backbone.Model.extend({
	parse: function( response ){
		response.id = response._id;
		console.log(response);
		return response;	
	},	
	defaults: {
		name: 'First and Last',
		email: 'user@user.com',
		birthDate: 'Unknown',
		role: 'general'
	}

	
});