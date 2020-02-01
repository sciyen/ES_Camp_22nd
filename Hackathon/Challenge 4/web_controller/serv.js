var fs = require("fs");

const express = require('express');
const app = express();
const port = 10418;

const SerialPort = require("serialport");

// USB的裝置名稱
const portName = '/dev/ttyACM0';

// USB通訊的各項參數，需與Arduino端一致
var sp = new SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

// 將public底下的檔案公開
app.use(express.static(__dirname + '/public'));
console.log (`listening port:${port} `);

app.listen(port);

// 接收前端傳來的/control
app.get("/control", (req, res)=>{
    // 若屬性cmd為"shoot"，發送訊息"1,"給Arduino
    if(req.query.cmd == "shoot"){
        msg = "1,"
        console.log("shoot")
        sendArduino(msg)
        res.send(req.query.cmd)
    }
    else if(req.query.cmd != "stop"){
        //console.log("Get control request!" + req.query.cmd);
        res.send(req.query.cmd)
        para = req.query.cmd.split(',')
        msg = '0,' + para[1].split('.')[0] + ',' + para[0].split('.')[0] + ',\n'
        console.log(msg)
        sendArduino(msg)
    }
    else
        res.send("ok");
})

sp.on("open", function () {
    console.log('Serial com port open');
}); 

sp.on('data', function(data) {
    console.log('data received: ' + data.toString());
    send()
});

//sp.write(new Buffer('0,100,100\n','ascii'), function(err, results) {
// '0,100,100\n'
function sendArduino(msg){
    sp.write(msg, function(err, results) {
        //console.log('err ' + err);
        //console.log('results ' + results);
    });
}
