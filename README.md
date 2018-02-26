# Bamazon

## Description
A command-line shopping app built using JavaScript and MySQL and executed through Node.js.

## Technologies used
* MySQL
* Node.js
* JavaScript
* Inquirer NPM Package
* dotenv NPM package
* Chalk NPM package

## Customer Mode

### How it Works
1. Clone Repo
2. Install NPM packages listed in package.json dependencies
3. Open Git Bash or Terminal to run command "node bamazonCustomer.js" 
4. A list of products will appear
5. Type the item_ID of product you would like to buy when prompted
6. Type quantity of product you want to buy when prompted
7. If the product is available, your order summary will appear
8. If the product you choose is out of stock, you will be prompted to choose a different one

### Screenshots

* Shows the list of products available for purchase:

![Product List](/images/prodList.png)

* Shows that the product is out of stock and gives the user a chance to buy another item:

![Product Chosen is Out of Stock](/images/outOfStock.png)

* Since the item is in stock, it shows the order summary and ends connection:

![Product Chosen is in Stock](/images/inStock.png)

## Manager Mode

### How it Works
1. Run command "node bamazonManager.js" 
2. A list of task will appear
3. If you choose "View Products for Sale" - a list of the inventory will appear
4. If you choose "View Low Inventory" - a list of items with inventory <= 5 will appear
5. If you choose "Add to Inventory" - you will be prompted to enter the item ID and the quantity you are adding 
6. If you choose "Add New Product" - you will be prompted to enter the item name, department, price and quantity in stock for the new item and then it will show the updated list of products

### Screenshots

* Shows the task list for the manager to choose from:

![Task List](/images/taskList.png)

* Shows the list of products available for purchase:

![Product List](/images/viewList.png)

* Shows a list of items with inventory <= 5:

![Low Inventory List](/images/lowInv.png)

* It prompts the manager to enter item ID and quantity to be added to an existing product:

![Add Inventory](/images/addInv.png)

* It prompts the manager to enter product name, department name, price and quantity of stock of new item being added:

![Add Product](/images/newProd.png)

## Author
Daniela Jaros