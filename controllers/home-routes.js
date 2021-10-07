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
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('signup');
});

router.get('/addjob', async (req, res) => {
  res.render('addjob', {
    layout: 'main',
  });
});

router.post('/addjob', async (req, res) => {
try {
  const dbJobData = await Job.findOne({
    where: {
      job_title: req.body.job_title,
      job_company: req.body.job_company,
      job_description: req.body.job_description,
      job_salary: req.body.job_salary,
      job_technologies: req.body.job_technologies,
      job_contact: req.body.job_contact,
    },
  });

  if (!dbJobData) {
    res
      .status(400)
      .json({ message: 'Please enter all fields!' });
    return;
  }

  req.session.save(() => {
    req.session.user_id = dbJobData.id;
    req.session.logged_in = true;
    res
      .status(200)
      .json({ post: dbJobData, message: 'You are now logged in!' });
  });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
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