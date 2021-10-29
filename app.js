const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
let Article = require('./models/md-article');

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
})



// initialize the list
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`));