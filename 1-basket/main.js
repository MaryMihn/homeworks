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

let htmlProducts = products
  .map(({ name, picture, price }, index) => `<div class="Product">
    <div class="name">${name}</div>
    <div class="img"><img class="img" src="${picture}" alt="pic"></div>
    <div class="bottom">
      <div class="price">${price}</div>
      <button class="buy" data-id="${index}">Buy</button>
    </div>
  </div>`)
  .join('')

document.getElementById("Products").innerHTML = htmlProducts;

Array.from(document.getElementsByClassName('buy')).forEach(element => {
    element.addEventListener('click', ({ target }) => {
        const id = +target.dataset.id
        const product = products[id]
        basket.addProduct(product)

        const chosenProducts = basket.getProducts()

        if (chosenProducts.length) {
            const htmlChoice = `Products: ${chosenProducts.map(({ name }) => name).join(', ')}. Price: ${basket.getPrice()}.`
            document.getElementById('choice').innerHTML = htmlChoice;
        }
    })
})
