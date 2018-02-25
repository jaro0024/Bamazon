// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

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
    productList();
});

// Function to read the table in the database and console.log the list of products for sale
function productList() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_ID + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name +
                " || Price: " + res[i].price);
        }
        console.log("\n");
        placeOrder();

        if (err) throw err;
    });
};

// Function to take the user order
function placeOrder() {
    // Prompt user to enter which product they want to purchase and how many units
    inquirer
        .prompt([
            {
                name: "product_id",
                type: "input",
                message: "Please enter the item ID of the product you wish to buy: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity you would like to buy: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])

        .then(function (answer) {
            // console.log(answer.product_id);
            connection.query("SELECT * FROM products WHERE ?", { item_ID: answer.product_id }, function (err, res) {
                if (answer.quantity > res[0].stock_quantity) {
                    console.log("Insufficient Quantity! Please select another product");
                }
                else {
                    var total = answer.quantity * res[0].price;
                    console.log("-------------------------------------------------------------------");
                    console.log("YOUR ORDER SUMMARY: " );
                    console.log(
                        "Item ID: " +
                        res[0].item_ID +
                        " || Product: " +
                        res[0].product_name +
                        " || Department: " +
                        res[0].department_name +
                        " || Price: " +
                        res[0].price +
                        " || Total: " +
                        total.toFixed(2)
                    );
                    console.log("-------------------------------------------------------------------");
                }
            });
        });
};

