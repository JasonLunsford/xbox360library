var path = require('path');
var express = require('express');
var app = express();

// Set Express options
app.set("view options", { layout: false });

// Log the requests (sends to the console)
app.use(express.logger('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Move Router up here to allow Angular to handle page routing
app.use(app.router);

app.use(function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});


// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');
