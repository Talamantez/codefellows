// site/js/Backbone.View.js

var app = app || {};
app.Backbone.View = Backbone.View.extend({

	remove: function() {
		// Empty the element and remove it from the DOM while preserving events
		$(this.el).empty().detach();

		return this;
	}

});
