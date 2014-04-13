// Router

// site/js/routers/router.js

var app = app || {};
app.Router = Backbone.Router.extend({
 
    routes:{
        "edit/:id": "edit" //#edit/123487421hdfuiow
    },
	
	edit: function(){
		alert('edit')
		;
	}
});
 
var app = new AppRouter();
Backbone.history.start();