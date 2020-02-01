var express = require('express');
var router = express.Router();
var csv = require('fast-csv')
var converter = require('hex2dec');
var fs = require('fs');

/////////
//index//
/////////

/* GET home page. */
//未使用
router.get('/', function(req, res, next) {
    res.redirect('index');
});

router.get('/index', function(req, res, next) {
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    if(req.cookies.user && req.user.comsumeMode){
   		res.redirect('ComsumeScore');
    }else{
    res.render('index', req);
    }
});


//////////
//login //
//////////
//未使用
router.get('/login', function(req, res, next) {
    res.render('login')
})

router.post('/login', function(req, res, next) {
    req.error = '使用者名稱密碼錯誤'
    res.render('login', req);

})
/********************************************************************************************************************/
router.get('/logout', function(req, res, next) {
    //刪除Cookie
    res.clearCookie('user');
    res.redirect('index');
});
module.exports = router;

/////////////
//addScore //
/////////////

router.get('/addScore', function(req, res, next) {
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    //console.log(req.user);
    res.render('addScore', req);
});

router.post('/addScore', function(req, res, next) { //加分設定頁面
    //console.log(req.body.score);
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    res.clearCookie('user');

    //把紀錄存入cookie
    res.cookie("user", { username: req.cookies.user.username, score: req.body.score }, { expires: new Date(2020, 3, 15) }, { httpOnly: true });
    //console.log(req.user);

    res.redirect('index');

});


router.get('/confirmAdd', function(req, res, next) {
    res.render('confirmAdd', req);
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
});

router.post('/confirmAdd', function(req, res, next) { //實際上的加分
    //console.log(req.query.team);
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    //console.log(req)
    
    //////////////
    //add Score //
    //////////////
    
    var team = req.query.team;
    
    if (req.query.score) {

        teamscore[team - 1].score = req.query.score;
        console.log(req.query.score);
        saveScore();
        updateHistory(team, req.query.score)
    }
    req.data = {};
    req.data.path = req.query.value;
    res.render('confirmAdd', req);
});

router.get('/confirmConsume', function(req, res, next) {
    res.render(res, req);
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
});
router.post('/confirmConsume', function(req, res, next) {
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    //////////////
    //rmv Score //
    ////////////// 
    req.data = {};
    req.data.path = req.query.value;

    var team = req.query.team;

    updateHistory(team, req.query.score)
    
    //紀錄消費王
    console.log(teamscore[team - 1].totalUse)
    console.log(teamscore[team - 1].score)
    console.log(req.query.score)
    teamscore[team - 1].totalUse = parseInt(teamscore[team - 1].totalUse) + parseInt(teamscore[team - 1].score) - parseInt(req.query.score)
    teamscore[team - 1].score = req.query.score;

    saveScore();

    res.render('confirmAdd', req);
});

////////////
//history //
////////////

var history = []
//預先載入歷史紀錄
readHistory()

function readHistory() {
    if(history.length == 0){
        console.log("History read from file...")
        //show hist
        fs.readFile('../csv/history.txt', function (err, data) {
            if (err) 
                throw err;
            history = data.toString().split('\n')

        });
    }
}

function updateHistory(team, newScore){

        readHistory()

        history.unshift(getDateTime() + " // team " + team + ": " + teamscore[team - 1].score + " -> " + newScore)
        if(history.length > 500){
            history.pop()
        }

    line = ""

    for (var i = 0; i < history.length; i++) {
        line += history[i] + '\n'
    }

    //write hist
    fs.writeFile('../csv/history.txt', line, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Append operation complete.');
    });

}


router.get('/history', function(req, res, next) {
    if (req.cookies.user && req.cookies.user.username == '4ff75f80957469c4b6af5824cb99bf4919abad98') {
        req.user = req.cookies.user;
        console.log('access successful');
        req.history = ""
        for(var i = 0; i<history.length;i++)
            req.history += history[i].toString() + "<br/>"
    } else {
        console.log('access fail');
    }


    res.render('history', req)
});

/////////////////
//ComsumeScore //
/////////////////

router.get('/ComsumeScore', function(req, res, next) {
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }

    res.cookie("user", { username: req.cookies.user.username, comsumeMode: true }, { expires: new Date(2020, 3, 15) }, { httpOnly: true });
    res.render('ComsumeScore', req);
});


router.get('/cancelComsume', function(req, res, next) {
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    res.cookie("user", { username: req.cookies.user.username }, { expires: new Date(2020, 3, 15) }, { httpOnly: true });
    res.redirect('index');
});

////////////
//loadCSV //
////////////

var database = [];
var teamscore = [];
var csvstream = csv.parseFile("../csv/data.csv", { headers: true })
    .on("data", function(row) {
        csvstream.pause();
        // do some heavy work

        database.push(row);

        // when done resume the stream
        csvstream.resume();
    })
    .on("end", function() {
        console.log("We are done!")
    })
    .on("error", function(error) {
        console.log(error)
    });

var csvstream2 = csv.parseFile("../csv/team.csv", { headers: true })
    .on("data", function(row) {
        csvstream2.pause();
        // do some heavy work

        teamscore.push(row);

        // when done resume the stream
        csvstream2.resume();
    })
    .on("end", function() {
        console.log("We are done!")
    })
    .on("error", function(error) {
        console.log(error)
    });

////////////
//saveCSV //
////////////
function saveScore() {
    console.log("csv saving...")
    csv.writeToPath("../csv/team.csv", teamscore, { headers: true })
        .on('error', err => console.error(err))
        .on('finish', () => console.log('Done writing.'));

}
/////////
//hash //
/////////

function dehash(hash) {
    var row = converter.hexToDec(hash.slice(13, 15)) - 17;
    //console.log("dehash: " + hash.slice(13, 15));
    return row; //row start from 1
}

//////////
//query //
//////////
router.get('/query', function(req, res, next) {
    //console.log(req.cookies.user);

    if (req.cookies.user && req.cookies.user.username == '4ff75f80957469c4b6af5824cb99bf4919abad98') {
        req.user = req.cookies.user;
        console.log('access successful');
    } else {
        console.log('access fail');
    }

    //const test = 'b1141164cf258ce64aa70867c62883e941a9ff6a';

    if (req.query.value) {
        var row = dehash(req.query.value);
        if (req.query.value == database[row].hash) {
            req.data = {};
            req.data.name = database[row].name;
            req.data.team = database[row].team;
            req.data.score = teamscore[database[row].team - 1].score;

        }else{
            req.data = {};
            req.data.name = "查無資料!";
            req.data.team = req.data.score = "";

        }

	}else{
		req.data = {};
   		req.data.name =    req.data.team = req.data.score = "";
	}
    ////
    res.render('query', req);

});

router.get('/teamScore', function(req, res, next) {
    req.teamScore = "";
    for(var i = 0; i < 8; i++){
        req.teamScore += "第" + (i+1).toString() + "小隊: " + teamscore[i].score + "點 " + "(已消費" + teamscore[i].totalUse + "點)<br/>"
    }
    ////
    res.render('teamScore', req);

});
//////////
//login //
//////////

key = {}

router.get('/eslogin', function(req, res, next) {
    res.render('eslogin')
});


router.post('/eslogin', function(req, res, next) {

    var username = req.body.username;
    var pwd = req.body.pwd;
    var user = {
        username: key.username,
        pwd: key.pwd
    }
    if (username == user.username && pwd == user.pwd) {

        res.cookie("user", { username: '4ff75f80957469c4b6af5824cb99bf4919abad98' }, { expires: new Date(2020, 3, 15) }, { httpOnly: true });
        res.redirect('index');
    } else {
        req.error = '使用者名稱密碼錯誤'
        res.render('eslogin', req);
    }

})

readPassword();
function readPassword()
{
    // default username and password: watermelon,pineapple
    fs.readFile('../csv/key.txt', function (err, data) {
            if (err) 
                throw err;
            key.username = data.toString().split(',')[0]
            key.pwd = data.toString().split(',')[1]

        });
}

////////
//set //
////////

router.get('/set', function(req, res, next) {
    req.history = ""

    if (req.cookies.user && req.cookies.user.username == '4ff75f80957469c4b6af5824cb99bf4919abad98') {
        console.log('access successful');

                req.data = {};
                req.data.teamScore = [0,0,0,0,0,0,0,0];
                for (var i = 0; i <8; i++) {
                    req.data.teamScore[i] = teamscore[i].score;
                }

                req.user = req.cookies.user;

                req.history = ""
                for(var i = 0; i<history.length;i++)
                    req.history += history[i].toString() + "<br/>"


    } else {
        console.log('access fail');
    }


    res.render('set', req)
});

router.post('/set', function(req, res, next) {
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    //////////////
    //set Score //
    ////////////// 
    var team = [req.body.score0,req.body.score1,req.body.score2,req.body.score3,req.body.score4,req.body.score5,req.body.score6,req.body.score7]
    
    for (var i = 0; i <8; i++) {
        if (teamscore[i].score != team[i]) {
            updateHistory(i+1, team[i]);
            teamscore[i].score = team[i];

        }
    }
    saveScore();

    req.data = {}
    req.data.teamScore = team
    
    req.user = req.cookies.user;

    req.history = ""
    for(var i = 0; i<history.length;i++){
        req.history += history[i].toString() + "<br/>"
    }

    res.render('confirmSet', req);
});

/////////////
//get date //
/////////////
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + month + day + "::" + hour + ":" + min + ":" + sec;

}