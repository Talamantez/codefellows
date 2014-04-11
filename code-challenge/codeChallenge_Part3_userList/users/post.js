jQuery.post('/api/books', {
	'title': 'JavaScript',
	'author': 'Douglas Crockford',
	'releaseDate': new Date( 2008, 4, 1 ).getTime()
}, function(data, textStatus, jqXHR) {
	console.log( 'Get response' );
	console.dir( data );
	console.log( textStatus );
	console.dir( jqXHR );
});