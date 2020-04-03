class Basket {
    constructor(name){
        this.name = name;
    }

    products = [];

    getProduct(index){
        return this.products[index];
    };

    removeProduct(index){
        this.products.splice(index, 1)
    };

    addProduct(product){
        this.products.push(product);
    };

    getProducts(){
        return this.products
    };

    getPrice (){
        return this.products.reduce((sum, product) => sum + product.price, 0);
    };
}

class Product {
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
}

let tv = new Product( "tv", 1900);
let mobile = new Product( "mobile", 2500);
let home = new Product( "home", 1000);
let plate = new Product( "plate", 99);
let glasses = new Product( "glasses", 125);

let basket = new Basket("main");
basket.addProduct(tv);
basket.addProduct(mobile);
basket.addProduct(home);
basket.addProduct(plate);
basket.addProduct(glasses);

function getCheep(basket) {
    let products = basket.getProducts();
    return  products.filter(product => product.price < 300)
}

console.log(basket.getProducts());
console.log(basket.getProduct(1));
console.log(basket.getPrice());
console.log(getCheep(basket));
