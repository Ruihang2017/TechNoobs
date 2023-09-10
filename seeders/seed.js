const sequelize = require("../config/connection");
const { Blog, Comment, User } = require("../models");

const blogSeed = require("./seed-blog");
const commentSeed = require("./seed-comment");
const userSeed = require("./seed-User");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userSeed);
  await Blog.bulkCreate(blogSeed);
  await Comment.bulkCreate(commentSeed);

  console.log("Finished Seeding Database");
  process.exit(0);
};

seedDatabase();
