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
  .join('');

document.getElementById("Products").innerHTML = htmlProducts;

function renderChoice(basket) {
    const chosenProducts = basket.getProducts();

    if (chosenProducts.length === 0) {
        document.getElementById('choice').innerHTML = '';
        document.getElementById('price').innerHTML = '';
        return
    }

    const htmlChoice = `<p class="pro">Products:</p><br> ${chosenProducts
        .map(({name}, index) => `<div class="choosen">${name} <button class="remove" data-id="${index}">Remove</button></div>`)
        .join('')}`;
    const htmlPrice = `<p class="pri">Price:</p> ${basket.getPrice()}.`;
    document.getElementById('choice').innerHTML = htmlChoice;
    document.getElementById('price').innerHTML = htmlPrice;

    Array.from(document.getElementsByClassName('remove')).forEach(element => {
        element.addEventListener('click', ({target}) => {
            const id = +target.dataset.id;
            basket.removeProduct(id)
            renderChoice(basket)
        })
    })
}

Array.from(document.getElementsByClassName('buy')).forEach(element => {
    element.addEventListener('click', ({target}) => {
        const id = +target.dataset.id;
        const product = products[id];
        basket.addProduct(product);

        renderChoice(basket)
    })
});



document.getElementById('basket').addEventListener( 'click', function(){miniChoise(basket)});
console.log(basket)

function miniChoise(basket) {
    const chosenProducts = basket.getProducts();

    const mini = chosenProducts
        .map(({name, picture, price}) => `
      <div class="miniImg">
        <img class="imgMini" src="${picture}" alt="pic">
      </div>
      <div class="miniName"><p class="pri">Your tropical plants - </p> ${name}</div>
      <div class="miniPrice"><p class="pri">Price:</p>  ${price}</div>`)
        .join('');

    document.getElementById("youWant").innerHTML = mini;

    if (chosenProducts.length === 0) {
        return ` you nothing chosen`
    }
}