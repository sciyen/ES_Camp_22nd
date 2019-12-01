const express = require('express');
const app = express();
const port = 10418;

app.use(express.static(__dirname + '/public'));
console.log (`Listening on port:${port} `);

app.listen(port);
