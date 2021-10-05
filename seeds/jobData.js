const { Job } = require('../models');

const jobData =
[
  {
    "job_title": "Front End Developer",
    "job_description": "Come work for Google as a Front End Developer!",
    "job_salary": 50000,
    "job_technologies": "Javascript, CSS",
    "job_contact": "google.com",
    "user_id": 1,
  },
  {
    "job_title": "Back End Developer",
    "job_description": "Come work for Youtube as a Back End Developer!",
    "job_salary": 60000,
    "job_technologies": "SQL, Node",
    "job_contact": "youtube.com",
    "user_id": 2,
  },
  {
    "job_title": "Fullstack Developer",
    "job_description": "Come work for Twitter as a Fullstack Developer!",
    "job_salary": 70000,
    "job_technologies": "SQL, Node, Javascript, CSS",
    "job_contact": "twitter.com",
    "user_id": 3,
  }
]

const seedJob = () => Job.bulkCreate(jobData)

module.exports = seedJob