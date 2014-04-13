// site/js/views/user.js

var app = app || {};

app.UserView = Backbone.View.extend({
	tagName: 'div',
	className: 'userContainer',
	template: _.template( $('#userTemplate').html() ),

	render: function() {
		console.log("This is", this);
		this.$el.html( this.template( this.model.toJSON() ));
		return this;
	},
	
	events: {
		'click .delete': 'deleteUser',
		'click .edit': 'editUser'
	},
	
	editUser: function(){
	//get the edit button id -- this is the same as the model's id
	// and pass it to a variable
    recordId = this.$('.edit').attr('id');	
	alert('Scroll up to edit the data');
	//drop it into the update id
	jQuery.get( '/api/users/' + recordId,
	recordFields = function( data, textStatus, jqXHR ){
		console.log( 'Get response:' );
		console.dir( data );
	//alert Model data
		//parse roles
	//	var roles = [];
	//	_.each(data.role, function( roleobj ){roles.push(roleobj.role)});

		
		birthDate = $.format.date( new Date( data.birthDate ), 'MM/dd/yyyy' )
		// alert( 'name : ' + data.name +'\r' +
				// 'email : ' + data.email + '\r' +
				// 'birthDate : ' + birthDate +'\r' +
				// 'role : ' + data.role + '\r' +
				// 'id : ' + data._id
				// );
	//populate the edit form with Model data
			$('#updateName').val(data.name);
			$('#updateEmail').val(data.email);
			$('#updateBirthDate').val(birthDate);
			$('#updateRole').val(data.role);
			$('#updateId').val(data._id);
		console.log( textStatus );
		console.dir( jqXHR );
	});
	

	//$('#updateId').val(recordId);
	
	},	

	deleteUser: function(){
		// Delete model
		this.model.destroy();
		// Delete view
		this.remove();
	}
	
});