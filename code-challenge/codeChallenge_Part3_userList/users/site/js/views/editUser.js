// site/js/views/userCollection.js

var app = app || {};

app.EditUserCollectionView = Backbone.View.extend({
	
	el:'#users',
	
	initialize: function( ) {
		
		this.collection = new app.UserCollection();
		this.collection.fetch({ reset: true });
		this.render();
		
	//	console.log("User Collection is", this);
		this.listenTo( this.collection, 'add', this.renderUser );
		this.listenTo( this.collection, 'reset', this.render );
	},
	

	events: {
		'click #update': 'updateUser'
	},
	
	updateUser: function( e ){
		e.preventDefault();
		
		var formData = {};
		
		$( '#editUser div' ).children( 'input' ).each( function( i,el ){
			if( $( el ).val() != '' )
			{
				if( el.id === 'role' ){
				formData[ el.id ] = [];
				_.each( $( el ).val().split( ' ' ), function( role ) {
					formData[ el.id ].push({ 'role': role});
					});
			} else if( el.id === 'birthDate') {
				formData[ el.id ] = $( '#birthDate' ).datepicker( 'getDate' ).getTime();
			} else {
				formData[ el.id ] = $( el ).val();
			}
		}
		//Clear input field value
		$( el ).val('');
		});
		
		this.collection.create( formData );
	},
		updateUser: function( e ){
		e.preventDefault();
		
		var formData = {};
		
		$( '#updateUser div' ).children( 'input' ).each( function( i,el ){
			if( $( el ).val() != '' )
			{
				if( el.id === 'role' ){
				formData[ el.id ] = [];
				_.each( $( el ).val().split( ' ' ), function( role ) {
					formData[ el.id ].push({ 'role': role});
					});
			} else if( el.id === 'birthDate') {
				formData[ el.id ] = $( '#birthDate' ).datepicker( 'getDate' ).getTime();
			} else {
				formData[ el.id ] = $( el ).val();
			}
		}
		//Clear input field value
		$( el ).val('');
		});
		
		this.collection.create( formData );
	},
	
		render: function() {
		this.collection.each(function( item ) {
		console.log("Attempting to render item", item);
			this.renderUser( item );
		}, this );
	},
	
	renderUser: function( item ) {
		var userView = new app.UserView({
			model: item
		});
		console.log(this)
		this.$el.append( userView.render().el );
	}
	

	
});