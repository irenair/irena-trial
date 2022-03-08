'use strict';

var app = express();
var PORT = process.env.PORT;

app.listen(PORT);
console.log(`Running on port ${PORT}`);