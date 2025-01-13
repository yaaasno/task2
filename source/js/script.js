const menuBurger = document.querySelector('.main-nav__burger');
const menuNav = document.querySelector('.main-nav__menu');
const menuClose = document.querySelector('.main-nav__closed');

menuBurger.addEventListener('click', function() {
  menuNav.classList.add('menu--showed');
});

menuBurger.removeEventListener('click', menuNav);

menuClose.addEventListener('click', function() {
  menuNav.classList.remove('menu--showed');
})

const addShop = document.querySelectorAll('.black-button');
const addProduct = document.querySelector('.basket');
const hintNext = document.querySelector('.basket__tap');
const hintExit = document.querySelector('.basket__close');

addShop.forEach((button) => {
  button.addEventListener('click', function() {
    addProduct.classList.add('basket--product');
  });
});

hintNext.addEventListener('click', function() {
  addProduct.classList.remove('basket--product');
});

hintExit.addEventListener('click', function() {
  addProduct.classList.remove('basket--product');
});

import './products.js';

console.log(products);

// import renderProducts from './renderProducts.js';
// import './productCart.js';

// // const { id, tag, price, image, status, out } = product;
// // const hintHotPrime = hintHot.cloneNode(true);

// // if (status.length) {
// //   catalogItem.classList.add(`product__${status}`);
// // };

// const catalogList = document.querySelector('.catalog__list');
// const catalogItemTemplate = document.querySelector('#product').content;

// renderProducts(products, catalogItemTemplate, catalogList, true, 'catalog__item');
