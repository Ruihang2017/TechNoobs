  ![GitHub](https://img.shields.io/badge/license-mit-blue)
# TechNoobs

## Deployed link (Heroku): 
https://fast-mountain-02387-77bab3c3ff16.herokuapp.com/

## Table of Contents
 - [Project Description](#Project-Description)
 - [User Stories](#User-Stories)
 - [Acceptance Criteria](#Acceptance-Criteria)
 - [Usage](#Installation-and-Usage) 
 - [Screenshots](#Screenshots)
 - [Credits](#Credits)
 - [Deployment Links](#Deployment-Links)

## Project Description

The TechNoobs is a web application that allows developers to publish their blog posts, read and comment on other developers' posts. It provides a platform for the tech community to share knowledge, insights, and recent advancements in the field of technology.


## Features
- **User Authentication**: Secure user registration and login using the bcrypt package for password hashing and express-session for session management.
- **User Authentication**: Secure user registration and login using the bcrypt package for password hashing and express-session for session management.

- **Blog Post Management**: Registered users can create, edit, and delete their blog posts. Each blog post includes a title, content, and author information.

- **Commenting**: Users can comment on blog posts to engage in discussions and provide feedback. Comments are associated with specific blog posts.

- **MVC Architecture**: The application follows the Model-View-Controller (MVC) architectural pattern, enhancing code organization and maintainability.

- **Handlebars.js Templates**: Utilizes Handlebars.js as the templating engine for generating dynamic HTML content.

- **Database Integration**: Connects to a MySQL database using the MySQL2 package and Sequelize as the Object-Relational Mapping (ORM) tool for data modeling.

- **API Endpoints**: Provides a RESTful API using Express.js for handling CRUD operations on blog posts, comments, and user authentication.

- **Environment Variables**: Uses the dotenv package to manage environment variables, allowing for secure configuration settings.

- **Deployment**: Deployed to Heroku, making the application accessible to a wide audience.


## Technologies Used

- Express.js
- Sequelize ORM
- Handlebars.js
- MySQL
- bcrypt
- express-session
- dotenv
- Heroku (for deployment)

## Folder Structure

The project follows the Model-View-Controller (MVC) paradigm with the following folder structure:

- `models`: Contains Sequelize models for database tables.
- `views`: Handlebars.js templates for rendering HTML.
- `controllers`: Express.js controllers for handling API routes and logic.
- `public`: Static assets like stylesheets, JavaScript, and images.
- `config`: Configuration files, including database and session setup.
- `routes`: Defines API routes and URL endpoints.
- `utils`: Utility functions and helpers.

