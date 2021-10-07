const router = require("express").Router();
const sequelize = require("../config/connection");
const { Job, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    console.log("dashboard-route")
    const dbJobData = await Job.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      // include: [
      //   {
      //     model: User,
      //     //   attributes: ['filename', 'description'],
      //     attributes: ["email"],
      //   },
      // ],
    });
    
console.log(dbJobData);

    const jobs = dbJobData.map((job) => job.get({ plain: true }));
console.log(jobs);

    res.render("dashboard", {
      layout: 'dashboard',
      jobs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;