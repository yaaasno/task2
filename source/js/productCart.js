import { addToStorage, removeFromStorage, getStorage } from './localstorage.js';
import { openModal, closeModal } from './modals.js';

const modalCart = document.querySelector('#modal_cart');
const modalCartError = document.querySelector('#modal_cart_error');
const blockMenu = document.querySelector('.user-menu__shopping-cart');
const cart = blockMenu.querySelector('.shopping-cart');
const cartList = cart.querySelector('.shopping-cart__list');
const cartOpenedButton = blockMenu.querySelector('.user-menu__link');
const cartCount = blockMenu.querySelector('.user-menu__count');
const cartProductTemplate = document.querySelector('#shopping-cart-product').content;

const removeProductFromCart = (productId) => {
    const node = cartList.querySelector(`[data-product-id="${productId}"]`);
    node.remove();
    cartCount.textContent = cartList.childElementCount;

    if(!cartList.childElementCount) {
        cart.classList.remove('user-menu__cart_active');
    }
    removeFromStorage(productId, 'cart');
};

const addProductToCart = (product, isClick = false) => {
    // долго, муторно, проще с localStorage
    // const cartItems = Array.from(cartList.querySelectorAll('.shopping-cart__item'));
    // const cartItemsIds = cartItems?.map(el => Number(el.dataset.productId));

    // if(!product || cartItemsIds?.includes(product.id)) {
    //     openModal(modalCartError);
    //     return;
    // }

    // вот так лучше, но теперь надо не забыть, что обязательно при клике не добавлять в корзину
    if(!product || (isClick && getStorage('cart')?.map(el => Number(el.id))?.includes(product.id))) {
        openModal(modalCartError);
        return;
    }

    const node = cartProductTemplate.querySelector('.shopping-cart__item').cloneNode(true);

    node.dataset.productId = product.id;
    node.querySelector('.shopping-cart__link').href = product.link;
    node.querySelector('.shopping-cart__link img').src = product.image;
    node.querySelector('.shopping-cart__link p').textContent = product.name;
    node.querySelector('.shopping-cart__link span').textContent = `${product.price} ₽`;

    node.querySelector('.shopping-cart__delete').addEventListener('click', (event) => {
        removeProductFromCart(product.id);
        event.stopPropagation();
    });

    if(isClick) {
        openModal(modalCart);
    }

    cartList.append(node);
    addToStorage(product, 'cart');
    cartCount.textContent = cartList.childElementCount;
};

const openCart = (event) => {
    event.preventDefault();

    if(!cartList.childElementCount) {
        return;
    }

    cart.classList.add('user-menu__cart_active');
};

const closeCart = (event) => {
    if(blockMenu.contains(event.target)) {
        return;
    }

    if(cart.classList.contains('user-menu__cart_active')) {
        event.preventDefault();
    }

    cart.classList.remove('user-menu__cart_active');
};

cartOpenedButton.addEventListener('click', openCart);

document.addEventListener('click', closeCart);

if(getStorage('cart')?.length) {
    getStorage('cart').forEach(product => {
        addProductToCart(product);
    });
    cartCount.textContent = cartList.childElementCount;
}

export { removeProductFromCart, addProductToCart };
