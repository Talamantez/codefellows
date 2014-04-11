jQuery.ajax({
	url: '/api/books/5347aa63e7d1814825000001',
	type: 'DELETE',
	success: function( data, textStatus, jqXHR ){
		console.log( 'Post response: ' );
		console.dir( data );
		console.log( textStatus );
		console.dir( jqXHR );
	}
});

