var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.mysql_pwd,
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    productList();


});

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

function placeOrder() {
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
                console.log(
                    "Item ID: " +
                    res[0].item_ID +
                    " || Product: " +
                    res[0].product_name +
                    " || Department: " +
                    res[0].department_name +
                    " || Price: " +
                    res[0].price
                );
            });
        });
};

// function checkInventory() {
//     if() {
//         console.log("Insufficient Quantity!");
//     }
//     else {
//         console.log("Here is your order summary: " + );
//     }
// };
