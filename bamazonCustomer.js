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
    console.log(chalk.greenBright("WELCOME TO BAMAZON!!! HERE IS THE LIST OF OUR PRODUCTS: "));
    console.log("---------------------------------------------------------------------------------------------------------------------------------------");
    productList();
});

// Function to read the table in the database and console.log the list of products for sale
function productList() {
    connection.query("SELECT * FROM products", function (err, res) {

        var table = new Table({
            head: [chalk.greenBright("ID"), chalk.greenBright("PRODUCT NAME"), chalk.greenBright("DEPARTMENT"), chalk.greenBright("PRICE")]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price.toFixed(2)]);
        }
        //Create table layout with items for sale
        console.log(table.toString());
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
        // Query to get the input of the user
        .then(function (answer) {
            // console.log(answer.product_id);
            connection.query("SELECT * FROM products WHERE ?", { item_ID: answer.product_id }, function (err, res) {
                // If the item is out of stock, then console.log msg to choose another item
                if (answer.quantity > res[0].stock_quantity) {
                    console.log("\n");
                    console.log("---------------------------------------------------------------------------------------------------------------------------------------");
                    console.log(chalk.redBright("PRODUCT IS OUT OF STOCK. PLEASE SELECT ANOTHER ONE:"));
                    console.log("---------------------------------------------------------------------------------------------------------------------------------------");
                    productList();
                }
                // Else, show the order summary and the total
                else {
                    var total = answer.quantity * res[0].price;
                    console.log("---------------------------------------------------------------------------------------------------------------------------------------");
                    console.log(chalk.greenBright("YOUR ORDER SUMMARY: "));
                    console.log(chalk.greenBright(
                        "Item ID: " +
                        res[0].item_ID +
                        " || Product: " +
                        res[0].product_name +
                        " || Department: " +
                        res[0].department_name +
                        " || Price: " +
                        res[0].price +
                        " || Quantity: " +
                        answer.quantity +
                        " || Total: " +
                        total.toFixed(2)
                    ));
                    // Updating inventory after the order is placed
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: res[0].stock_quantity - answer.quantity
                            },
                            {
                                item_id: answer.product_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                        }
                    );
                    console.log("---------------------------------------------------------------------------------------------------------------------------------------");
                    console.log(chalk.redBright("THANK YOU FOR SHOPPING AT BAMAZON!"));
                    // Ending connection
                    process.exit();
                }
            });
        });
};

