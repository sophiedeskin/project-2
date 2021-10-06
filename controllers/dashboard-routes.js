const router = require("express").Router();
const sequelize = require("../config/connection");
const { Job, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbJobData = await Job.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          //   attributes: ['filename', 'description'],
          attributes: ["username"],
        },
      ],
    });

    const jobs = dbJobData.map((job) => job.get({ plain: true }));

    res.render("dashboard", {
      jobs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;