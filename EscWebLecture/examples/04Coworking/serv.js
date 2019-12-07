const express = require('express');
const app = express();
const port = 10418;

app.use(express.static(__dirname + '/public'));
console.log (`Listening on port:${port} `);
var id = 0

app.get("/initial", (req, res)=>{
    id += 1
    var msg = {
        "id": id
    }
    res.send(msg)
})

app.get("/hit", function(req, res){
    var id = req.query.id
    var msg = "user " + id + " hit!"
    console.log(msg)
    res.send(msg)
})

app.listen(port);
