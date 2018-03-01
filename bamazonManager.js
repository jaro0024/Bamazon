// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
var chalk = require("chalk");
var Table = require("cli-table2");

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
    // Prompt manager with task options
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "Choose a task below: ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        // Query to get manager's choice 
        .then(function (answers) {
            if (answers.task === "View Products for Sale") {
                viewList();
            }
            else if (answers.task === "View Low Inventory") {
                viewLowInv();
            }
            else if (answers.task === "Add to Inventory") {
                addInventory();
            }
            else if (answers.task === "Add New Product") {
                addProduct();
            }
        });
};

// Function to show the list of available products to purchase
function viewList() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("---------------------------------------------------------------------------------------------------------------------------------------");
        var table = new Table({
            head: [chalk.greenBright("ID"), chalk.greenBright("PRODUCT NAME"), chalk.greenBright("DEPARTMENT"), chalk.greenBright("PRICE"), chalk.greenBright("STOCK QUANTITY")]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
        }
        //Create table layout with items for sale
        console.log(table.toString());
        console.log("---------------------------------------------------------------------------------------------------------------------------------------");

        if (err) throw err;
        managerTask();
    });
};

// Function to show a list of products with low inventory
function viewLowInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("---------------------------------------------------------------------------------------------------------------------------------------");
        var table = new Table({
            head: [chalk.greenBright("ID"), chalk.greenBright("PRODUCT NAME"), chalk.greenBright("DEPARTMENT"), chalk.greenBright("PRICE"), chalk.greenBright("STOCK QUANTITY")]
        });
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
            }
        }
        //Create table layout with items for sale
        console.log(table.toString());
        console.log("---------------------------------------------------------------------------------------------------------------------------------------");

        if (err) throw err;
        managerTask();
    });
};

// Function to add inventory to existing products
function addInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter item ID of product being updated: ",
                name: "itemNum"
            },
            {
                type: "input",
                message: "Enter inventory quantity being added: ",
                name: "invAdded"
            }
        ])
        .then(function (answers) {
            connection.query("SELECT * FROM products WHERE ?", { item_ID: answers.itemNum }, function (err, res) {
                var newQuantity = parseInt(answers.invAdded) + res[0].stock_quantity;
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: answers.itemNum
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("---------------------------------------------------------------------------------------------------------------------------------------");
                        console.log(chalk.greenBright("Inventory for item " + answers.itemNum + " - " + res[0].product_name + " has been updated to " + newQuantity + "."));
                        console.log("---------------------------------------------------------------------------------------------------------------------------------------");
                        managerTask();
                    }
                );
            });
        });
};

// Function to add new products to inventory
function addProduct() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter product name to add: ",
                name: "prod"
            },
            {
                type: "input",
                message: "Please enter department name: ",
                name: "dept"
            },
            {
                type: "input",
                message: "Please enter product price: ",
                name: "price"
            },
            {
                type: "input",
                message: "Please enter quantity in stock: ",
                name: "quantity"
            }
        ])
        .then(function (answers) {
            connection.query("INSERT INTO products SET ?",
                { product_name: answers.prod, department_name: answers.dept, price: answers.price, stock_quantity: answers.quantity },
                function (error) {
                    if (error) throw err;
                    console.log("---------------------------------------------------------------------------------------------------------------------------------------");
                    console.log(chalk.greenBright("The new item was sucessfully added! Here is your updated inventory: "));
                    viewList();
                }
            );
        });
};