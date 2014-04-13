// site/js/views/userCollection.js

var app = app || {};

app.UserCollectionView = Backbone.View.extend({
	
	el:'#users',
	
	initialize: function( ) {
		
		this.collection = new app.UserCollection();
		this.collection.fetch({ reset: true });
		this.render();
		
	//	console.log("User Collection is", this);
		
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sync', this.renderUser );
	},
	
	events: {
		'click #add': 'addUser',
		'click #update': 'updateUser'
	},
	
	addUser: function( e ){
		e.preventDefault();
		
		var formData = {};
		
		$( '#addUser div' ).children( 'input' ).each( function( i,el ){
			if( $( el ).val() != '' )
			{
			if( el.id === 'birthDate') {
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
	jQuery.ajax({
	url: '/api/users/' + $('#updateId').val(), 
	type: 'PUT',
	data: {
		'name': $('#updateName').val(),
		'email': $('#updateEmail').val(),
		'birthDate': $('#updateBirthDate').val(),
		'role' : 	$('#updateRole').val()
		},
	success: function( data, textStatus, jqXHR ){
			console.log( 'Post response:' );
			console.dir( 'data' );
			console.log( textStatus );
			console.dir( jqXHR );
		}
	});
		$('#updateName').val('');
		$('#updateEmail').val('');
		$('#updateBirthDate').val('');
		$('#updateRole').val('');
		$('#updateId').val('');
		location.reload();
		//this.collection.render();
		
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