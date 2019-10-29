var express = require('express');
var router = express.Router();

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

//query
router.get('/query', function(req, res, next) {
    console.log(req.cookies.user);

        if (req.cookies.user && req.cookies.user.username == '4ff75f80957469c4b6af5824cb99bf4919abad98') {
            req.user = req.cookies.user;
            console.log('access successful');
        } else {
            console.log('access fail');
        }
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