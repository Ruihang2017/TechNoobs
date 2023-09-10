// Importing required modules from Sequelize package
const { Model, DataTypes } = require("sequelize");

// Importing database connection from configuration
const sequelize = require("../config/connection");

// Defining our Task model by extending the built-in Model class of Sequelize
class Blog extends Model {}

// Initializing the model's data structures and configurations
Blog.init(
  {
    // Defining an ID column as a primary key, uses auto-increments
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Column for task's name or title
    blog_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Column for a detailed description of the task
    blog_content: {
      type: DataTypes.TEXT,
    },
    // Column for task's deadline
    postDate: {
      type: DataTypes.DATE,
    },
    // Status column to indicate the current status of the task with a default value of 'Pending'
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    // Using the established database connection for this model
    sequelize,
    // Enabling timestamps for automatic `created_at` and `updated_at` fields
    timestamps: true,
    // Ensuring the model name remains unchanged in database tables
    freezeTableName: true,
    // Using underscores instead of camel-casing for field names
    underscored: true,
    // Defining the name of this model
    modelName: "blog",
  },
);

// Exporting the model for use in other parts of the application
module.exports = Blog;
