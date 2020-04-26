class Basket {
    constructor(name){
        this.name = name;
    }

    products = {};

    removeProduct(id){
        delete this.products[id]
    };

    addProduct(product){
        const { id } = product;
        if (!this.products[id]){
            this.products[id] = { count: 0, product: product }
        }
        this.products[id].count++
    };

    minusProduct(product){
        const { id } = product;
        if (this.products[id].count===1) {
            this.removeProduct(id)
        } else {
            this.products[id].count--
        }
    }

    getProducts(){
        return Object.values(this.products)
    };

    getPrice (){
        return this.getProducts().reduce((sum, product) => sum + product.product.price*product.count, 0);
    };
}

class Product {

    constructor({ id, name, price, picture }){
        this.id = id;
        this.name = name;
        this.price = price;
        this.picture = picture;
    }
}

const products = [
    new Product({ id: 1, name: 'Lemon', price: 700, picture: 'picture/lemon.jpg' }),
    new Product({ id: 2, name: 'Kumquat', price: 800, picture: 'picture/kumquat.jpg' }),
    new Product({ id: 3, name: 'Mandarin', price: 695, picture: 'picture/mandarin.jpg' }),
    new Product({ id: 4, name: 'Lime', price: 588, picture: 'picture/lime.jpg' }),
    new Product({ id: 5, name: 'Limquat', price: 945, picture: 'picture/limquat.jpg' }),
    new Product({ id: 6, name: 'Grapefruit', price: 1020, picture: 'picture/grapefruit.jpg' }),
];

function getProduct(id){
    return products.find((product)=> product.id===id)
}

let basket = new Basket("main");

let htmlProducts = products
  .map(( { id, name, picture, price }) => `<div class="Product">
    <div class="name">${name}</div>
    <div class="img"><img class="img" src="${picture}" alt="pic"></div>
    <div class="bottom">
      <div class="price">${price}</div>
      <button class="buy" data-id="${id}">Buy</button>
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
        .map(({count, product: {id, name, picture, price }}) => `<div class="choosen"> 
        <img class="imgMini" src="${picture}" alt="pic">
        <div class="miniName"><p class="pri">Your plant - </p> ${name} 
           <div class="miniPrice"><p class="pri">Price : </p> ${price}</div>
           <div class="miniPrice"><p class="pri">Count : </p> ${count}</div>
        </div>
      </div> <button class="remove" data-id="${id}">Remove</button>
             <button class="button plus" data-id="${id}">+</button>
             <button class="button minus" data-id="${id}">-</button>`)
        .join('')}`;
    const htmlPrice = `<p class="pri">Total Price:</p> ${basket.getPrice()}.`;
    document.getElementById('choice').innerHTML = htmlChoice;
    document.getElementById('price').innerHTML = htmlPrice;


    Array.from(document.getElementsByClassName('plus')).forEach(element => {
        element.addEventListener('click', ({target}) => {
            const id = +target.dataset.id;
            const product = getProduct(id)
            basket.addProduct(product)
            renderChoice(basket)
        })
    })

    Array.from(document.getElementsByClassName('minus')).forEach(element => {
        element.addEventListener('click', ({target}) => {
            const id = +target.dataset.id;
            const product = getProduct(id)
            basket.minusProduct(product)
            renderChoice(basket)
        })
    })

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
        const product = getProduct(id)
        basket.addProduct(product);

        renderChoice(basket)
    })
});




