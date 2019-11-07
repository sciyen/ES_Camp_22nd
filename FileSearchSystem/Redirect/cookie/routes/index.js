var express = require('express');
var router = express.Router();
var csv =require('fast-csv');
var converter = require('hex2dec');

/* GET home page. */
router.get('/index', function(req, res, next) {
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    console.log(req.user)
    res.render('index', req);
});


router.get('/login', function(req, res, next) {
    res.render('login')
})

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    var user = {
        username: 'admin',
        pwd: 123456
    }
    if (username == user.username && pwd == user.pwd) {

        res.cookie("user", { username: username }, { expires: new Date(2020, 3, 15) });
        res.redirect('index');
    } else {
        req.error = '使用者名稱密碼錯誤'
        res.render('login', req);
    }

})

router.get('/logout', function(req, res, next) {
    //刪除Cookie
    res.clearCookie('user');
    res.redirect('index');
})
module.exports = router;

//////


var database = [];
var teamscore = [];
var csvstream = csv.parseFile("../csv/data.csv", { headers: true })
.on("data", function (row) {
    csvstream.pause();
    // do some heavy work
    
    database.push(row);

    // when done resume the stream
    csvstream.resume();
})
.on("end", function () {
    console.log("We are done!")
})
.on("error", function (error) {
    console.log(error)
});

var csvstream2 = csv.parseFile("../csv/team.csv", { headers: true })
.on("data", function (row) {
    csvstream2.pause();
    // do some heavy work
    
    teamscore.push(row);

    // when done resume the stream
    csvstream2.resume();
})
.on("end", function () {
    console.log("We are done!")
})
.on("error", function (error) {
    console.log(error)
});
//////

function dehash(hash){
	var row = converter.hexToDec(hash.slice(13,15))-17;
	console.log(hash.slice(13,15));
	return row;//row start from 1
}

//query
router.get('/query', function(req, res, next) {
    console.log(req.cookies.user);

    if (req.cookies.user && req.cookies.user.username == '4ff75f80957469c4b6af5824cb99bf4919abad98') {
        req.user = req.cookies.user;
        console.log('access successful');
    } else {
        console.log('access fail');
    }

    //const test = 'b1141164cf258ce64aa70867c62883e941a9ff6a';

    var row = dehash(req.query.value);
	
    req.data = {};
    req.data.name = database[row].name;
    req.data.team = database[row].team;
    req.data.score = teamscore[database[row].team-1].score;

	////
    res.render('query', req);

});

router.get('/eslogin', function(req, res, next) {
    res.render('eslogin')
})


router.post('/eslogin', function(req, res, next) {
    console.log(req.body.username);
    console.log(req.body.pwd);

    var username = req.body.username;
    var pwd = req.body.pwd;
    var user = {
        username: 'esncku',
        pwd: 'esncku'
    }
    if (username == user.username && pwd == user.pwd) {

        res.cookie("user", { username: '4ff75f80957469c4b6af5824cb99bf4919abad98' }, { expires: new Date(2020, 3, 15) });
        res.redirect('query');
    } else {
        req.error = '使用者名稱密碼錯誤'
        res.render('eslogin', req);
    }

})