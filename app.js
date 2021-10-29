const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Initializing express
const app = express();

// Setting handlebars middlewares
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// setup public folder
app.use(express.static(path.join(__dirname, 'public')));

// index page route
app.get('/', (req, res) => {
    res.render("index");
});




// initialize the list
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`));