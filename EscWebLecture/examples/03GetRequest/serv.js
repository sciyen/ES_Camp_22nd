const express = require('express');
const app = express();
const port = 10418;

app.use(express.static(__dirname + '/public'));
console.log (`Listening on port:${port} `);
var click_times = 0

app.get("/hello", function(req, res){
    res.send("hello, this is server. Click times= " + click_times);
    click_times++
})

app.listen(port);
