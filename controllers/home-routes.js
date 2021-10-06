const router = require('express').Router();
const sequelize = require('../config/connection');
const { Job, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage');
  });

// Login route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.loggedIn) {
    res.redirect('dashboard');
    return;
  }
  res.render('signup');
});

router.get('/create', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/add-job');
    return;
  }
  res.render('homepage');
});

router.get('/dashboard', (req, res) => {
  Job.findAll({
    include: [
      {
        model: User,
      }
    ]
  })
    .then(dbJobData => {
      // serialize data before passing to template
      const jobs = dbJobData.map(job => job.get({ plain: true }));
      res.render('dashboard', { jobs, logged_in: req.session.logged_in });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // if (req.session.logged_in) {
  //   res.redirect('/dashboard');
  //   return;
  // }
  // res.render('homepage');
});


router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Job.findAll({ where: { title: { [Op.like]: '%' + term + '%' } } })
    .then(jobs => res.render('searchresults', { jobs }))
    .catch(err => res.render('error', {error: err}));
});

module.exports = router;