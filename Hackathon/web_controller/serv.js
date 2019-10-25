var fs = require("fs");
//var name_list = fs.readFileSync("./name_list.json");

const express = require('express');
const app = express();
const port = 10418;

//var json_name = JSON.parse(name_list);
//var display_list = Object.keys(json_name);

app.use(express.static(__dirname + '/public'));
console.log (`listening port:${port} `);

app.listen(port);

app.get("/control", (req, res)=>{
    if(req.query.cmd != "stop"){
        console.log("Get control request!" + req.query.cmd);
        res.send(req.query.cmd)
    }
    else
        res.send("ok");
})

