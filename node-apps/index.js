'use strict';

var app = express();
var msg = require('./api');
var PORT = process.env.PORT;

app.use('/ping',msg);
app.listen(PORT);
console.log(`Running on port ${PORT}`);