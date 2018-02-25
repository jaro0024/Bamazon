// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
const chalk = require('chalk');

// Configuring connectiong with MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // My username
    user: "root",

    // My password from the dotenv file to keep it secured
    password: process.env.mysql_pwd,
    database: "bamazonDB"
});

// Attempt to connect - if no connection, than it will throw an error
connection.connect(function (err) {
    if (err) throw err;
    // If connectin is successful, than console.log the msg and run function below
    console.log("connected as id " + connection.threadId + "\n");
    managerTask();
});

function managerTask() {
    // Prompt user to enter which product they want to purchase and how many units
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "Choose a task below: ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        // Query to get the input of the user
        .then(function (answer) {
            if (answer.task === "View Products for Sale") {
                viewList();
            }
            else if (answer.task === "View Low Inventory") {
                viewLowInv();
            }
            else if (answer.task === "Add to Inventory") {
                addInventory();
            }
            else if (answer.task === "Add New Product") {
                addProduct();
            }
        });
};

function viewList() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("---------------------------------------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(chalk.yellowBright("Item ID: " + res[i].item_ID) + (chalk.whiteBright(" || Product: " + res[i].product_name)) + (chalk.cyanBright(" || Department: " + res[i].department_name)) +
                (chalk.magentaBright(" || Price: " + res[i].price)) + (chalk.greenBright(" || Quantity: " + res[i].stock_quantity)));
        }
        console.log("---------------------------------------------------------------------------------------------------------");

        if (err) throw err;
        process.exit();
    });
};

function viewLowInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("---------------------------------------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log(chalk.yellowBright("Item ID: " + res[i].item_ID) + (chalk.whiteBright(" || Product: " + res[i].product_name)) + (chalk.cyanBright(" || Department: " + res[i].department_name)) +
                    (chalk.magentaBright(" || Price: " + res[i].price)) + (chalk.greenBright(" || Quantity: " + res[i].stock_quantity)));
            }
        }
        console.log("---------------------------------------------------------------------------------------------------------");

        if (err) throw err;
        process.exit();
    });
};

// function addInventory() {

// };

// function addProduct() {

// };