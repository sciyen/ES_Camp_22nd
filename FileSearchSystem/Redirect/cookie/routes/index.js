var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var converter = require('hex2dec');

/////////
//index//
/////////

/* GET home page. */
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

        res.cookie("user", { username: username }, { expires: new Date(2020, 3, 15) }, { httpOnly: true });
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
});
module.exports = router;

/////////////
//addScore //
/////////////

router.get('/addScore', function(req, res, next) {
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    console.log(req.user);
    res.render('addScore', req);
});

router.post('/addScore', function(req, res, next) { //加分設定頁面
    console.log(req.body.score);
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    res.clearCookie('user');
    res.cookie("user", { username: req.cookies.user.username, score: req.body.score }, { expires: new Date(2020, 3, 15) }, { httpOnly: true });
    console.log(req.user);

    res.redirect('index');

});


router.get('/confirmAdd', function(req, res, next) {
    res.render('confirmAdd', req);
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
});

router.post('/confirmAdd', function(req, res, next) { //實際上的加分
    console.log(req.query.team);
    if (req.cookies.user !== null) {
        req.user = req.cookies.user;
    }
    //////////////
    //add Score //
    //////////////
    var team = req.query.team;
    if (req.cookies.user.score) {
        teamscore[team - 1].score = parseInt(req.cookies.user.score) + parseInt(teamscore[team - 1].score);
        console.log(teamscore[team - 1].score);
        saveScore();
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
    var team = req.query.team;
    console.log(teamscore[team - 1]);
    teamscore[team - 1].score = parseInt(teamscore[team - 1].score) - parseInt(req.body.consumeValue);

    req.data = {};
    req.data.path = req.query.value;
    saveScore();
    res.render('confirmAdd', req);
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
    console.log("dehash: " + hash.slice(13, 15));
    return row; //row start from 1
}

//////////
//query //
//////////
router.get('/query', function(req, res, next) {
    console.log(req.cookies.user);

    if (req.cookies.user && req.cookies.user.username == '4ff75f80957469c4b6af5824cb99bf4919abad98') {
        req.user = req.cookies.user;
        console.log('access successful');
    } else {
        console.log('access fail');
    }

    //const test = 'b1141164cf258ce64aa70867c62883e941a9ff6a';

    if (req.query.value) {
    var row = dehash(req.query.value);

    req.data = {};
    req.data.name = database[row].name;
    req.data.team = database[row].team;
    req.data.score = teamscore[database[row].team - 1].score;

	}else{
		req.data = {};
   		req.data.name =    req.data.team = req.data.score = "";
	}
    ////
    res.render('query', req);

});


//////////
//login //
//////////

router.get('/eslogin', function(req, res, next) {
    res.render('eslogin')
});


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

        res.cookie("user", { username: '4ff75f80957469c4b6af5824cb99bf4919abad98' }, { expires: new Date(2020, 3, 15) }, { httpOnly: true });
        res.redirect('index');
    } else {
        req.error = '使用者名稱密碼錯誤'
        res.render('eslogin', req);
    }

})