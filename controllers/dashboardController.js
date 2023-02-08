const db = require("../models");
const Sequelize = require('sequelize');

exports.getDashboardData = async (req, res) => {
  try {
    const jobPostCount = await db.jobPost.count();
    const jobApplyCount = await db.jobApply.count();
    const blogCount = await db.blog.count();
    const portfolioCount = await db.portfolio.count();

    res.status(200).json({
      message: "Dashboard Data Retrieved Successfully",
      data: {
        jobPostCount,
        jobApplyCount,
        blogCount,
        portfolioCount
      }
    });
  } catch (error) {
    res.status(500).json({
      type: 'Dashboard',
      message: 'Failed to retrieve dashboard data',
      error: error.message
    });
  }
};
