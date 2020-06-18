const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

// render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST login a user
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
);

// render register page
router.get('/register', (req, res) => {
  res.render('register');
});

// POST create a new user
router.post('/register', (req, res) => {
  //console.log(req.body);
  const { userName, email, password, confirmPassword } = req.body;
  if (!userName || !email || !password || !confirmPassword) {
    return res.render('register', {
      registerError: { message: 'Please complete all the fields' },
      userName,
      email,
      password,
      confirmPassword
    });
  }
  if (password !== confirmPassword) {
    return res.render('register', {
      registerError: { message: 'Please check your confirmed password' },
      userName,
      email,
      password,
      confirmPassword
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.render('register', {
        registerError: { message: 'This email has been registered' },
        userName,
        password,
        confirmPassword
      });
    }
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => {
        User.create({
          name: userName,
          email,
          password: hash
        });
        req.flash('success_msg', 'you have registered and can login!');
        res.redirect('/users/login');
      })
      .catch((err) => console.log(err));
  });
});

// Logout user
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Logout successfully');
  res.redirect('/users/login');
});
module.exports = router;
