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
const flash = require('connect-flash');
const session = require('express-session');
const usePassport = require('./config/passport');

//hbs setup
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
//express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.loginError = req.flash('error');
  next();
});

//bodyparser in express
app.use(express.urlencoded({ extended: false }));
//method override
app.use(methodOverride('_method'));
//express static
app.use(express.static('public'));

//routes
app.use(routes);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
