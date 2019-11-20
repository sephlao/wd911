// products on cart
const products = [
  {
    name: "Pants",
    price: 49.99,
  },
  {
    name: "Shirts",
    price: 10.0,
  }
];


/**
 * accepts product object and returns html template for preview
 * @param {[{}] products
 */
const getProductsTemplateHTML = products => {
  const template = ({ name, price, qty = 1, extendedPrice }, i) => `
    <tr>
        <td>${name}</td>
        <td data-id="${i}">
            <button data-action="decrement">-</button>
            <span>${qty}</span>
            <button data-action="increment">+</button>
        </td>
        <td>$ <span>${price.toFixed(2)}</span></td>
        <td>$ <span>${extendedPrice ? extendedPrice.toFixed(2) : price.toFixed(2)}</span></td>
    </tr>`;
  return products.reduce((accu, elem, i) => accu + template(elem, i), ``);
};

/**
 * render data to html
 */
const render = () => {
  document.getElementById(`products`).innerHTML = getProductsTemplateHTML(products);
};

/**
 * update quantity and extended price values for each product that`s updated
 * @param event 
 */
const updateProductValues = ({ target }) => {
  if (!target.matches(`button`)) return;
  const id = parseInt(target.closest(`td`).dataset.id);
  const action = target.closest(`button`).dataset.action;
  const product = products[id];
  product.qty = product.qty ? product.qty : 1;

  if (action === `increment`) {
    product.qty++;
  } else {
    if (product.qty > 1) product.qty--;
  }

  product.extendedPrice = product.qty * product.price;
  render();
};

window.addEventListener(`load`, () => {
  // bind update product function
  document.getElementById(`products`).addEventListener(`click`, updateProductValues)
  // show products on html
  render();
});

