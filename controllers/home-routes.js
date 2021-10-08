const router = require('express').Router();
const sequelize = require('../config/connection');
const { Job, User } = require('../models');
const withAuth = require('../utils/auth');

// Login route
router.get('/', (req, res) => {
  res.render('homepage');
});

//signup route
router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/addjob', async (req, res) => {
res.render('addjob', {
  layout: 'addjob',
});
});

router.get('/editjob', async (req, res) => {
  // try {
  //   const dbJobData = await Job.findOne({
  //     where: {
  //       // use the ID from the session
  //       // id: req.params.id,
  //       id: req.params.id,
  //       // user_id: req.session.user_id,
  //     },
  //   });
    // const jobs = dbJobData.map((job) => job.get({ plain: true }));
    res.render('editjob', {
      layout: 'editjob'
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
  // res.render('myjobspage', {
  //   layout: 'myjobspage',
  });
  });

// router.post('/addjob', async (req, res) => {
//   try {
//     const dbJobData = await Job.create({
//         job_title: req.body.job_title,
//         job_company: req.body.job_company,
//         job_description: req.body.job_description,
//         job_salary: req.body.job_salary,
//         job_technologies: req.body.job_technologies,
//         job_contact: req.body.job_contact,
//     });

//     req.session.save(() => {
//       req.session.logged_in = true;
//       res.status(200).json(dbJobData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


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

router.get('/myjobspage', withAuth, async (req, res) => {
  try {
    const dbJobData = await Job.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
    });
    const jobs = dbJobData.map((job) => job.get({ plain: true }));
    res.render('myjobspage', {
      layout: 'myjobspage', jobs
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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