// products on store
const products = [
  {
    name: "Pants",
    price: 49.99,
    qty: 2
  },
  {
    name: "Shirts",
    price: 10.0,
    qty: 15
  },
  {
    name: "Hat",
    price: 3.66,
    qty: 17
  }
];

// products on cart
const cart = []; // start with empty cart

/**
 * returns template either for store or checkout view
 * @param {{}} product - product infp
 */
const getTemplate = ({ name, price, qty, extendedPrice, i, viewAs }) => {
  return viewAs === 'cart' ?  `
        <tr>
          <td>${name}</td>
          <td data-id="${i}">
              <button data-action="decrement">-</button>
              <span>${qty}</span>
              <button data-action="increment">+</button>
          </td>
          <td>$ <span>${price.toFixed(2)}</span></td>
          <td>$ <span>${extendedPrice.toFixed(2)}</span></td>
        </tr>` :
        `<tr>
          <td>${name}</td>
          <td>${price}</td>
          <td>${qty}</td>
          <td data-id="${i}">${!cart[i] ? `<button class="">Add to cart</button>` : qty === 0 ?  `<strong>Out of Stock</strong>` : ''}</td>
        </tr>`;
};

/**
 * accepts product object and returns html template for preview
 * @param {[{}]} products - products on cart
 */
const getProductsTemplateHTML = (products, viewAs) => {
  return products.reduce((accu, elem, index) => accu + getTemplate({...elem, i: index, viewAs}), ``);
};

/**
 * calculates invoice
 */
const caclulateInvoce = () => {
  const subTotal = cart.reduce((acc, cur) => acc + cur.extendedPrice, 0);
  const tax = subTotal * 0.13; // 13% tax rate;
  document.getElementById(`output`).innerHTML = `
  <li>Subtotal: ${subTotal.toFixed(2)}</li>
  <li>Tax: ${tax.toFixed(2)}</li>
  <li>Total: ${(subTotal + tax).toFixed(2)}</li>
  `;
}

/**
 * render data to html
*/
const render = () => {
  document.getElementById(`products`).innerHTML = getProductsTemplateHTML(products, 'store');
  document.getElementById(`cart`).innerHTML = getProductsTemplateHTML(cart, 'cart');
  caclulateInvoce();
};

/**
 * add product to cart
 * @param {{}} {target} - event target element
 */
const addProductToCart = ({target}) => {
  if(!target.matches(`button`)) return;
  const id = parseInt(target.closest(`td`).dataset.id); // use index as id for now
  cart[id] = {...products[id], qty: 1};
  cart[id].extendedPrice = cart[id].price
  products[id].qty--; // decrement stocks by 1
  render(); // show cart items/ reflect changes of quantity to view
};

/**
 * update quantity and extended price values for each product that`s updated
 * @param event 
 */
const updateProductValues = ({ target }) => {
  if (!target.matches(`button`)) return;
  const id = parseInt(target.closest(`td`).dataset.id); // set index as id for now
  const action = target.closest(`button`).dataset.action;
  const cartProduct = cart[id];

  switch (action) { // increment/decrement - can be done with if else
    case "increment":
      if (products[id].qty !== 0) {
        cartProduct.qty++;
        products[id].qty--;
      }
      break;
    default:
      cartProduct.qty--;
      products[id].qty++
      // I'm using delete instead of splice because I need the index as my ID
      // TODO - unique id generator for cart items
      if (cartProduct.qty === 0) { delete cart[id] };
  }

  cartProduct.extendedPrice = cartProduct.qty * cartProduct.price;
  render();
};

// document.getElementById(`calculate`).addEventListener(`click`, caclulateInvoce);

window.addEventListener(`load`, () => {
  render(); // show products on store section

  document.getElementById(`products`).addEventListener(`click`, addProductToCart); // bind add product event
  document.getElementById(`cart`).addEventListener(`click`, updateProductValues); // bind cart update qty event
});


