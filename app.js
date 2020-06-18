const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('./config/mongoose');
const routes = require('./routes/index');
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

//hbs setup
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

//bodyparser in express
app.use(express.urlencoded({ extended: false }));
//method override
app.use(methodOverride('_method'));
//express static
app.use(express.static('public'));

//routes
app.use(routes);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
