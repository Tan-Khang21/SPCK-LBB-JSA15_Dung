
function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);

  const html = products.map(product => `
    <div class="col custom" data-id="${product.id}">
      <div class="Product-item">
        <div class="Product-item--img">
          <img src="${product.image}" alt="">
          <button class="add-item" type="submit"><i class="fa-solid fa-cart-arrow-down"></i></button>
        </div>
        <h3 class="Product-item--title">${product.name}</h3>
        <p class="Product-item-price">
          ${product.price.toLocaleString('vi-VN')} VND
        </p>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}


async function getProducts() {
  const res = await fetch('./data/product.json');
  return await res.json();
}

async function init() {
  const products = await getProducts();

  const product_1 = products.slice(0, 4);
  renderProducts(product_1, 'product-list--1');


  const product_2 = products.slice(4);
  renderProducts(product_2, 'product-list--2');

  const product_3 = products.slice(1,5);
  renderProducts(product_3, 'product-list--3');
}

init();
