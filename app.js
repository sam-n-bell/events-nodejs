
let express = require('express');
let cors = require('cors');
let app = express();
let routes = require('./routes/index');
require('dotenv').config();
require('babel-register');

app.use(cors());


// get route index file and mount it
app.use('/v1', routes);

app.get('/*', function(req, res){
    res.json({message: 'How did you get here?'});
});

let port = process.env.PORT || 5000;

app.listen(port, function(){
    console.log('listening in on port ' + port);
});