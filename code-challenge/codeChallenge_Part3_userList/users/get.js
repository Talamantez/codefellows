jQuery.get( '/api/users/', function( data, textStatus, jqXHR ){
     console.log('Get response:' );
     console.dir( data );
     console.log( textStatus );
     console.dir( jqXHR );
});


// get a single book with an id

jQuery.get( '/api/users/534888a3e623305820000005',
	function( data, textStatus, jqXHR ){
		console.log( 'Get response:' );
		console.dir( data );
		console.log( textStatus );
		console.dir( jqXHR );
	});