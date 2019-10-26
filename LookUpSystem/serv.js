const fs = require("fs");
const sheetDataPath = "./sheetData.json";
const tokenFilePath = "./token.json";
const https = require("https");

var sheetJson = {};
var TOKEN = JSON.parse(fs.readFileSync(tokenFilePath));

function getSheetJson(index){
    const url = "https://spreadsheets.google.com/feeds/cells/"+TOKEN.sheetID+"/"+index+"/public/values?alt=json";
    https.get(url, (res)=>{
        var body = '';
        res.on('data', (chunk)=>{body+=chunk;})
        res.on('end', ()=>{
//            console.log(body)
            var content = JSON.parse(body);
            var entry = content.feed.entry; 
            const title = content.feed.title["$t"];
            sheetJson[title] = [];
            var obj=[];
            var numCol = 0
            for( var i=0; i<entry.length && entry[i]["gs$cell"]["row"]==1; i++){
                obj.append(entry[i]["gs$cell"]["$t"]);
                numCol++;
            }/*
            for( var i=0; i<entry.length; i++){
                for( var j=0; j<numCol; j++){
                    sheetJson[title][]
                }
            }*/
            content.feed.entry.forEach((entry)=>{
            })
            console.log(content);
        })
    })
}
if(fs.existsSync(sheetDataPath)){
    // Load json from local data
    var sheetDataStr = fs.readFileSync(sheetDataPath);
    sheetJson = JSON.parse(sheetDataStr);
}
else{
    // Fetch from google sheet
    getSheetJson(1);
    //Object.keys(TOKEN.sheetIndex).forEach((job)=>{
    //})
}


