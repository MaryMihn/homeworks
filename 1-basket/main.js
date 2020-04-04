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
    constructor({ name, price, picture }){
        this.name = name;
        this.price = price;
        this.picture = picture;
    }
}

const products = [
    new Product({ name: 'Lemon', price: 700, picture: 'picture/lemon.jpg' }),
    new Product({ name: 'Kumquat', price: 800, picture: 'picture/kumquat.jpg' }),
    new Product({ name: 'Mandarin', price: 695, picture: 'picture/mandarin.jpg' }),
    new Product({ name: 'Lime', price: 588, picture: 'picture/lime.jpg' }),
    new Product({ name: 'Limquat', price: 945, picture: 'picture/limquat.jpg' }),
    new Product({ name: 'Grapefruit', price: 1020, picture: 'picture/grapefruit.jpg' }),
];

let basket = new Basket("main");

let htmlProducts = '';
for (let product of products) {
    htmlProducts +=`<div class="Product">
    <div class="name">${product.name}</div>
    <div class="img"><img class="img" src="${product.picture}" alt="pic"></div>
    <div class="Price">
      <div class="priceLemon">${product.price}</div>
      <button class="${product.name}">Buy</button>
    </div>
</div>`;
}

document.getElementById("Products").innerHTML = htmlProducts;
 console.log( basket.getProducts())