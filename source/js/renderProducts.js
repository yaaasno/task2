import { addProductToCart } from './productCart.js';

export default (products, template, target, isTargetList = false, templateClass = '') => {
    const fragment = document.createDocumentFragment();

    let productEl = template.querySelector('.product');

    if(isTargetList) {
        const node = document.createElement('li');
        node.innerHTML = productEl.innerHTML;

        Array.prototype.forEach.call(productEl.attributes, function( attr ) {
            node.setAttribute( attr.name, attr.value );
        });
        node.classList.add(templateClass);

        productEl = node;
    }

    products.forEach(product => {
        const itemEl = productEl.cloneNode(true);
        const imageEl = itemEl.querySelector('.product__img');
        const titleEl = itemEl.querySelector('.product__title');
        const descriptionEl = itemEl.querySelector('.product__description');
        const linkEl = itemEl.querySelector('.product__link');
        const tagEl = itemEl.querySelector('.product__tag');
        const priceEl = itemEl.querySelector('.product__price span');
        const compoundEl = itemEl.querySelector('.product__compound');
        const miniTitleEl = itemEl.querySelector('.product__mini-title');
        const button = itemEl.querySelector('.product__button');
        const { id, tag, name, image, description, link, price, compound } = product;

        button.addEventListener('click', () => {
            addProductToCart(product, true);
        });

        itemEl.dataset.productId = id;
        imageEl.src = image;
        titleEl.textContent = name;
        linkEl.href = link;
        priceEl.textContent = `${price} ₽`;

        if(description?.length) {
            descriptionEl.classList.remove('hidden');
            descriptionEl.innerHTML = description;
        } else {
            descriptionEl.classList.add('hidden');
        }
        if(tag?.length) {
            tagEl.classList.remove('hidden');
            tagEl.innerHTML = tag;
        } else {
            tagEl.classList.add('hidden');
        }

        compoundEl.innerHTML = '';
        if(compound?.length) {
            miniTitleEl.classList.remove('hidden');
            compoundEl.classList.remove('hidden');

            compound.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                compoundEl.appendChild(li);
            });
        } else {
            miniTitleEl.classList.add('hidden');
            compoundEl.classList.add('hidden');
        }

        fragment.appendChild(itemEl);
    });

    target.innerHTML = '';
    target.append(fragment);
}
