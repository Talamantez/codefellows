jQuery.get( '/api/books/', function( data, textStatus, jqXHR ){
     console.log('Get response:' );
     console.dir( data );
     console.log( textStatus );
     console.dir( jqXHR );
});


// get a single book with an id

jQuery.get( '/api/books/5347aa63e7d1814825000001',
	function( data, textStatus, jqXHR ){
		console.log( 'Get response:' );
		console.dir( data );
		console.log( textStatus );
		console.dir( jqXHR );
	});