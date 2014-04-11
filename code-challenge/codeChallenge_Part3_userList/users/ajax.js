jQuery.ajax({
	url: '/api/books/5347aa63e7d1814825000001', 
	type: 'PUT',
	data: {
		'title': 'JavaScript The good parts',
		'author': 'The Legendary Douglas Crockford',
		'releaseDate': new Date( 2008, 4 ,1 ).getTime()
	},
	success: function( data, textStatus, jqXHR ){
			console.log( 'Post response:' );
			console.dir( 'data' );
			console.log( textStatus );
			console.dir( jqXHR );
		}
	});
