// site/js/views/library.js

var app = app || {};

app.LibraryView = Backbone.View.extend({
	
	el:'#books',
	
	initialize: function( initialBooks ) {
		
		this.collection = new app.Library( initialBooks );
		this.render();
	//	console.log("Library is", this);
		this.listenTo( this.collection, 'add', this.renderBook );
	},
	

	events: {
		'click #add': 'addBook'
	},
	
	addBook: function( e ){
		e.preventDefault();
		
		var formData = {};
		
		$( '#addBook div' ).children( 'input' ).each( function( i,el ){
			if( $( el ).val() != '' ){
				formData[ el.id ] = $( el ).val();
			}
		});
		
		this.collection.add( new app.Book( formData ) );
	},
		render: function() {
		this.collection.each(function( item ) {
		console.log("Attempting to render item", item);
			this.renderBook( item );
		}, this );
	},
	
	renderBook: function( item ) {
		var bookView = new app.BookView({
			model: item
		});
		console.log(this)
		this.$el.append( bookView.render().el );
	}
	

	
});