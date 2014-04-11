// Module dependencies
var application_root = __dirname,
	express = require( 'express' ),
	path = require( 'path' ),
	mongoose = require( 'mongoose' )
	;

// Create server	
var app = express();

// Configure server
app.configure( function(){
	//parses request body and populates request.body
	app.use( express.bodyParser() );
	
	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );
	
	//perform route lookup based on URL and HTTP method
	app.use( app.router );
	
	//Where to serve static content
	app.use( express.static( path.join( application_root, 'site' ) ) );
	
	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Start server
var port = process.env.PORT || 4711;
app.listen( port, function(){
	console.log( 'Express server listening on port %d in %s mode',
	port, app.settings.env );
});
//Connect to database
//mongoose.connect( process.env.MONGOLAB_URI ||'mongodb://localhost/library_database' );
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/library_database';
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

//Schemas
var Keywords = new mongoose.Schema({
	keyword: String
});
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [ Keywords ],
});

//Models
var BookModel = mongoose.model( 'Book' , Book );


//Routes
 app.get( '/api', function( request,response ){
	response.send( 'Library API is running' );
}); 

app.get( '/api/books', function( request,response ) {
	return BookModel.find( function( err, books ){
		if( !err ){
			return response.send( books );
		} else {
			return console.log( err );
		}
	});
});
//Get a single book by id
app.get('/api/books/:id', function( request, response ){
		return BookModel.findById( request.params.id,function( err,book ){
			if( !err ){
				return response.send( book );
			} else {
				return console.log( err );
			}
			
		});
});

//Insert a new book
app.post('/api/books', function( request, response ){
	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate,
		keywords: request.body.keywords
	});
	book.save( function( err ){
		if( !err ){
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
	});	
	return response.send( book );
});

//Update a book
app.put( '/api/books/:id', function( request, response ){
		console.log(' Updating Book ' + request.body.title );
		return BookModel.findById( request.params.id, function( err,book ){
			book.title = request.body.title;
			book.author = request.body.author;
			book.releaseDate = request.body.releaseDate;
			book.keywords = request.body.keywords;
			
		return book.save( function( err ) {
				if( !err ){
					console.log( 'book updated' );
				} else {
					console.log( err );
				}
				return response.send( book );
			});
		});
	});
	
app.delete( '/api/books/:id', function( request, response ){
	console.log( 'Deleting book with id: ' + request.params.id );
	return BookModel.findById( request.params.id, function( err,book ){
		return book.remove( function( err ){
			if( !err ){
				console.log( 'Book removed' );
			} else {
				console.log( err );
			}
		});
	});
});
		