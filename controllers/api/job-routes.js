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
    const dbJobData = await Job.findByPk(req.params.id);

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
router.post('/', withAuth,  async (req, res) => {
  console.log(req.body)
  try {

    const newJob = await Job.create({...req.body, user_id: req.session.user_id})
    res.json(newJob)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {

      const dbJobData = await Job.update(
        {
          ...req.body, user_id: req.session.user_id
      }
      )

      if (!dbJobData[0]) {
          res.status(404).json({ message: 'No job found with this id!' });
          return;
      }

      res.status(200).json(dbJobData);
  } catch (err) {
      console.log(err)
      res.status(500).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Job.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;