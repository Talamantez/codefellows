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
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/user_database';
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

//Schemas
// var Roles = new mongoose.Schema({
	// role: String
// });
var User = new mongoose.Schema({
	name: String,
	email: String,
	birthDate: Date,
	role: String
});

//Models
var UserModel = mongoose.model( 'User' , User );


//Routes
app.get('/edit', function( request, response ){
	response.send( 'Edit route is running' );
});

app.get( '/api', function( request,response ){
	response.send( 'User API is running' );
}); 

app.get( '/api/users', function( request,response ) {
	return UserModel.find( function( err, users ){
		if( !err ){
			return response.send( users );
		} else {
			return console.log( err );
		}
	});
});
//Get a single user by id

app.get('/api/users/:id', function( request, response ){
		return UserModel.findById( request.params.id,function( err,user ){
			if( !err ){
				return response.send( user );
			} else {
				return console.log( err );
			}
			
		});
});

//Insert a new user
app.post('/api/users', function( request, response ){
	var user = new UserModel({
		name: request.body.name,
		email: request.body.email,
		birthDate: request.body.birthDate,
		role: request.body.role
	});
	user.save( function( err ){
		if( !err ){
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
	});	
	return response.send( user );
});

//Update a user
app.put( '/api/users/:id', function( request, response ){
		console.log(' Updating User ' + request.body.name );
		return UserModel.findById( request.params.id, function( err,user ){
			user.name = request.body.name;
			user.email = request.body.email;
			user.birthDate = request.body.birthDate;
			user.role = request.body.role;
			
		return user.save( function( err ) {
				if( !err ){
					console.log( 'user updated' );
				} else {
					console.log( err );
				}
				return response.send( user );
			});
		});
	});

app.delete( '/api/users/:id', function( request, response ){
	console.log( 'Deleting user with id: ' + request.params.id );
	return UserModel.findById( request.params.id, function( err,user ){
		return user.remove( function( err ){
			if( !err ){
				console.log( 'User removed' );
			} else {
				console.log( err );
			}
		});
	});
});
		