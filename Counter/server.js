var express     = require("express");
var path        = require("path");
var bodyParser  = require("body-parser");

var app         = express();

var session     = require("express-session");
app.use(session({ secret: "supersecretreallysecretsecret" }));

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

/*******ROUTES******/

/** OG Counter **/
app.get('/', function(req, res){
    if (req.session.count == null){
        req.session.count = 1;
    } else {
        req.session.count = req.session.count + 1;
    }
    console.log(req.session.count);
    res.render("index", { count:req.session.count });
})

/** Counter ++ **/
app.get('/byTwo', function(req, res){
    req.session.count += 1;
    console.log(req.session.count);
    res.redirect('/');
})

/** Reset that dumb counter **/
app.get('/reset', function(req, res){
    req.session.count = 0;
    console.log(req.session.count);
    res.redirect('/');
})

/******* Listening port ******/
app.listen(8000, function() {
    console.log("Port 8000 is on... hopefully.");
})