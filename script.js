// carrousel

const btn = document.querySelector('.carrouse__btn');
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const img3 = document.querySelector('.img3');
const txtframe = document.querySelector('.txtframe');
const temp1 = document.querySelector('.template0')
const temp2 = document.querySelector('.template1');
const temp3 = document.querySelector('.template2');

function changePic() {

    if (img1.classList[1] !== 'hidden') {
        img1.classList.add('hidden');
        temp1.classList.add('hidden');
        img2.classList.remove('hidden');
        temp2.classList.remove('hidden');
    } else if (img2.classList[1] !== 'hidden') {
        img2.classList.add('hidden');
        temp2.classList.add('hidden');
        img3.classList.remove('hidden');
        temp3.classList.remove('hidden');
    } else if (img3.classList[1] !== 'hidden') {
        img3.classList.add('hidden');
        temp3.classList.add('hidden');
        img1.classList.remove('hidden');
        temp1.classList.remove('hidden');
    }

}

const intervalId = setInterval(changePic, 5000);

btn.addEventListener('click', () => {
    clearInterval(intervalId);
    changePic();
    // intervalId;
})

window.onload = intervalId;

// carrousel

// shopping cart


const btns = document.querySelectorAll('.addtocart-btn');
const htmlCart = document.querySelector('.cartUl');
const htmlTotal = document.querySelector('.htmlTotal');

let totalCart = 0;

// ADD TO CART BTN

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {

    let name = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    let imgsrc = e.target.previousElementSibling.previousElementSibling.previousElementSibling.src;
    let price = parseInt(e.target.previousElementSibling.lastChild.textContent.replace('$',''));

    let NewItem = new ProductInCart(name, imgsrc, price);

    if (htmlCart.textContent.indexOf(name) != -1) {

      let htmlQuantity = document.querySelector(`.${NewItem.name}-quantity`);
      let htmlPrice = document.querySelector(`.${NewItem.name}-price`);

      htmlQuantity.textContent = `(${parseInt(htmlQuantity.textContent.replace('(','').replace(')','')) + 1})`;
      htmlPrice.textContent = `$${parseInt(htmlPrice.textContent.replace('$','')) + price}`;

    } else {
    
      let htmlCartElement = document.createElement('li');
      htmlCartElement.classList.add('cart-product-item');
      htmlCartElement.classList.add(NewItem.name);
      htmlCartElement.innerHTML = 
      `
      <h3 class="cart-product-name">${NewItem.name}</h3>
      <div class="cart-product-container">
      <img class="cart-product-img" src="${NewItem.imgsrc}">
      <span class="cart-product-quantity ${NewItem.name}-quantity">(1)</span>
      <span class="cart-product-price ${NewItem.name}-price">$${NewItem.price}</span>
      </div>
      <button class="btn cart-product-delete ${NewItem.name}-delete">Borrar</button>
      `

      htmlCart.appendChild(htmlCartElement);

    }

    // 

    totalCart += NewItem.price;
    htmlTotal.textContent = `$${totalCart}`
    
  })
})

// CART DROP SHADOW

const cartLabel = document.querySelector('label');

document.addEventListener('click', () => {
  
  if (htmlCart.textContent.length > 15) {
    cartLabel.classList.add('cart-label-style');
  } else if (htmlCart.textContent.length === 0 || htmlCart.textContent.length < 15) {
    cartLabel.classList.remove('cart-label-style');
  }

})

// DELETE ITEM BTN 

document.addEventListener('click', (e) => {

  if (e.target.className.indexOf('cart-product-delete') != -1) {

    let deletePrice = parseInt(e.target.previousElementSibling.lastChild.previousElementSibling.textContent.replace('$',''));
    totalCart -= deletePrice;
    htmlTotal.textContent = `$${totalCart}`

    e.target.parentElement.remove();

    if (htmlCart.textContent.length === 15) {
      cartLabel.classList.remove('cart-label-style');
    }
    
  }
})

// PROCEED BTN

const proceedBtn = document.querySelector('.cart-proceed');
const header = document.querySelector('header');
const cart = document.querySelector('.cartPage');
let printInvoice;

proceedBtn.addEventListener('click', () => {

  if (totalCart != 0) {

    // alert('Un último paso para finalizar');

    // layout.style.visibility = 'hidden';
    // header.style.visibility = 'hidden';
    cart.style.visibility = 'hidden';
    // cartLabel.style.visibility = 'hidden';

    finalForm.style.visibility = 'visible';

    // window.scroll({
    //   top: 0, 
    //   left: 0, 
    //   behavior: 'smooth' 
    //  });

    let invoiceProductsList = htmlCart.textContent.replaceAll('Borrar','').replaceAll('            ',' ').replaceAll('      ','%0a');

    printInvoice = 
    `ORDEN DE COMPRA%0a-------------------------%0a${invoiceProductsList}-------------------------%0aTOTAL: $${totalCart}%0a-------------------------%0a`;
    
  } else if (totalCart === 0) {

    alert('Selecciona los productos que querés comprar antes de avanzar.')

  }
})

// FINAL FORM

const finalBtn = document.querySelector('.final-btn');
const finalForm = document.querySelector('.final-form');
const layout = document.querySelector('.cards');

let clName = document.getElementById('nombre');
let clTlf = document.getElementById('tlf');
let clAddress = document.getElementById('direccion');
let clEmail = document.getElementById('email');
let clData;

finalBtn.addEventListener('click', () => {
  if (clName.value === '' || clTlf.value === '' || clAddress.value === '' || clEmail.value === '') {

    alert('Alguno de los campos está incompleto');

  } else {

  htmlCart.textContent = '';
  totalCart = 0;
  htmlTotal.textContent = `$${totalCart}`
  
    collectData();

  printInvoice = 
  `${printInvoice}DATOS DEL CL:%0a${clData}`

  let wsLink = 'https://wa.me/541164171844?text=';
  let wsMsg = `${wsLink}${printInvoice}`;
  window.open(wsMsg);

  alert('¡Gracias por tu compra!')
  window.location.reload(false);
  }
})

// EMPTY CART

const cartClean = document.querySelector('.cart-clean');

cartClean.addEventListener('click', () => {

  htmlCart.textContent = '';
  totalCart = 0;
  htmlTotal.textContent = `$${totalCart}`

})

// GO BACK BTN

const goBackBtn = document.querySelector('.goback-btn');

goBackBtn.addEventListener('click', () => {

  layout.style.visibility = 'visible';
  header.style.visibility = 'visible';
  cart.style.visibility = 'visible';
  finalForm.style.visibility = 'hidden';
  cartLabel.style.visibility = 'visible';
})


// COLLECT CL'S DATA

function collectData() {
  clData = 
  `Nombre: ${clName.value}%0aTeléfono: ${clTlf.value}%0aDirección: ${clAddress.value}%0aEmail: ${clEmail.value}`;
  return clData;
}

// 

function ProductInCart(name, imgsrc, price) {
   this.name = name,
   this.imgsrc = imgsrc,
   this.price = price
};
// shopping cart