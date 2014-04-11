jQuery.post( '/api/books', {
	'title': 'Secrets of the JavaScript Ninja',
	'author': 'John Resig',
	'releaseDate': new Date( 2008, 3, 12 ).getTime(),
	'keywords':[
			{ 'keyword': 'JavaScript' },
			{ 'keyword': 'Reference' }
		]	
	}, function( data, textStatus, jqXHR ) {
		console.log( 'Post response:' );
		console.dir( data );
		console.log( textStatus );
		console.dir( jqXHR );
	});