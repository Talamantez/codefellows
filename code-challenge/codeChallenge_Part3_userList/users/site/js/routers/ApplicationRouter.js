var ApplicationRouter = Backbone.Router.extend({

	initialize: function(el) {
		this.el = el;
		this.addView = new ContentView({template: '#addView'});
		this.editView = new ContentView({template: '#editView'});
	},

	routes: {
		"": "add",
		"add": "add",
		"edit": "edit",
	},

	currentView: null,

	switchView: function(view) {
		if (this.currentView) {
			// Detach the old view
			this.currentView.remove();
		}

		// Move the view element into the DOM (replacing the old content)
		this.el.html(view.el);

		// Render view after it is in the DOM (styles are applied)
		view.render();

		this.currentView = view;
	},

	/*
	 * Change the active element in the topbar
	 */
	setActiveEntry: function(url) {
		// Unmark all entries
		$('li').removeClass('active');

		// Mark active entry
		$("li a[href='" + url + "']").parents('li').addClass('active');
	},

	lorem: function() {
		this.switchView(this.loremView);
		this.setActiveEntry('#lorem');
	},

	at: function() {
		this.switchView(this.atView);
		this.setActiveEntry('#at');
	},

	duis: function() {
		this.switchView(this.duisView);
		this.setActiveEntry('#duis');
	},

	notFound: function() {
		this.switchView(this.notFoundView);
	}

});
