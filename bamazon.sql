-- Drop the bamazonDB if it already exists --
DROP DATABASE IF EXISTS bamazonDB;
-- Creates a database called bamazonDB --
CREATE database bamazonDB;

-- Makes it so all the following code will affect bamazonDB --
USE bamazonDB;

-- Creates a table called "products" within the bamazonDB with the following columns --
CREATE TABLE products
(
    item_ID INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(225) NOT NULL,
    department_name VARCHAR(225) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_ID)
);

-- Creates new rows containing data in all columns created above --
INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Dell laptop", "Electronics & Computers", 699.99, 20),
    ("Nikon camera", "Electronics & Computers", 499.99, 30),
    ("MN Vikings Jersey", "Sports & Outdoor", 99.99, 50),
    ("Callaway Golf Set", "Sports & Outdoor", 175.99, 30),
    ("University of Minnesota T-shirt", "Sports & Outdoor", 21.99, 70),
    ("Instant Pot", "Appliances", 129.95, 40),
    ("Kitchenaid Mixer", "Appliances", 199.00, 30),
    ("Vitamix", "Appliances", 598.95, 20),
    ("Game of Thrones Lego", "Toys & Games", 14.95, 50),
    ("The Game of Life", "Toys & Games", 19.99, 50);