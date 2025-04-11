const products = require('./products');

function findProduct(productName) {
    const product = products.find(p => p.name === productName);
    if (product) {
        console.log(`Product found:`, product);
    } else {
        console.log(`Product "${productName}" not found.`);
    }
    return product;
}

// Test the function
findProduct("Laptop");
findProduct("T-shirt");
findProduct("Book");