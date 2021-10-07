const router = require('express').Router();
const { User , Job } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const dbJobData = await Job.findAll({
        include: [{ model: User }],
    });
    res.status(200).json(dbJobData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const dbJobData = await Job.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!dbJobData) {
      res.status(404).json({ message: 'No job found with that id!' });
      return;
    }

    res.status(200).json(dbJobData);
  } catch (err) {
    res.status(500).json(err);
  }

});


// CREATE new job
router.post('/', async (req, res) => {
  try {
    const dbJobData = await Job.create({
        job_title: req.body.job_title,
        job_company: req.body.job_company,
        job_description: req.body.job_description,
        job_salary: req.body.job_salary,
        job_technologies: req.body.job_technologies,
        job_contact: req.body.job_contact,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json(dbJobData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;