const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
let Article = require('./models/article');
const bodyParser = require('body-parser');

// Initializing express
const app = express();

// setting up mongoose orm connection to the database
mongoose.connect("mongodb://localhost/nodecrud");
let db = mongoose.connection;

// Check for connection
db.once('open', () => {
    console.log("connected to mongodb");
    return;
});


// check for db errors
db.on('error', (err) => {
    console.log(err);
    return;
})

// Setting handlebars middlewares
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// setup public folder
app.use(express.static(path.join(__dirname, 'public')));

// index page route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            return err;
        }
        res.render("index", { articles: articles, title: "Home Page" });
    }).lean();
});


app.get('/articles/add/', (req, res) => {
    res.render('add_article', { title: "Add Article" })
});

app.post('/articles/add/', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    console.log(req.body.author);
    article.save((err) => {
        if (err) {
            return err;
        }
        res.redirect('/');
    })
});



// initialize the list
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`));