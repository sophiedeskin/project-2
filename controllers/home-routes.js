const router = require('express').Router();
const sequelize = require('../config/connection');
const { Job, User } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
  });

// Login route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('signup');
});

module.exports = router;