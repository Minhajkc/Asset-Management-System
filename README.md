Asset Management System

 Asset Management System built with Node.js, Express, PostgreSQL, Sequelize,(jade) Pug, and Bootstrap, css,DataTables.net. This project helps manage employees, assets, categories, stock, asset issue, asset return,scrap asset, asset history, in one place.

Features
Employee Master CRUD
Asset Categories CRUD
Asset Master CRUD
Stock View with available stock calculation
Issue Asset with stock validation
Return Asset
Scrap Asset
Asset History
DataTables search, sorting, and pagination

Technologies Used
Node.js
Express.js
PostgreSQL
Sequelize ORM
Pug Template Engine (jade)
Bootstrap 5
CSS
jQuery DataTables

Installation
Clone the repository

Install dependencies:

npm install
Configure the .env file with your PostgreSQL database details.

Start the server:

nodemon app

Open the application in your browser:

http://localhost: YOUR PORt number


Project Structure
models-Sequelize models
controllers/ Business logic
routes-Express routes
views-Pug templates
public-CSS and JavaScript files
