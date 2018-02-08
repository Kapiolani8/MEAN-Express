
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


app.get('/', function(req, res) {
    res.render('index');
})


app.post('/dojoInformation', function(req, res) {
    console.log("dojo information:", req.body);
    console.log(req.body.name);
    req.session.info = req.body;
    res.redirect('/displayInfo');
})


app.get('/displayInfo', function(req, res){
    res.render('displayInfo', {dojoInformation: req.session.info });
})


app.listen(8000, function() {
    console.log("Port 8000 should be working... hopefully");
})