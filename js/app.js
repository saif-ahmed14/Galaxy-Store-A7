const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

//Show all products in UI 
const showProducts = (products) => {
  // document.getElementById('all-products').innerHTML = '';
  const allProducts = products.map(product => product);

  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement('div');
    div.classList.add('col', 'product');
    div.innerHTML = `
      <div class="single-product"> <div>
      <img class="product-image" src=${image}></img>

      <div>
      <h5 class="title-height my-4">${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h2 class="mb-2">Price: $ ${product.price}</h2>
      <p>Rating - ${product.rating.rate}
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      (${product.rating.count})</p>
      
      <button onclick="addToCart(${product.id}, ${product.price})" id="addToCart-btn" class="buy-now btn text-white btn-bg-color">Add to cart</button>

      <button id="details-btn" class="btn btn-secondary text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>

      <!-- This is modal section & it is optional for this assignment. I'll try to add this for getting better experience. But when i clicked details button every button shows the same result. I'll try again in the future to fix it. Thank you! -->

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title text-center" id="exampleModalLabel">${product.title}</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <img class="product-image" src=${image}></img>
      
              <div>
                <h4 class="title-height my-4">${product.title}</h4>
                <p>Category: ${product.category}</p>
                <h2 class="mb-2">Price: $ ${product.price}</h2>
                <p>Rating - ${product.rating.rate}
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                (${product.rating.count})</p>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="addToCart(${product.id}, ${product.price})">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};

//Add to cart function
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

//Get input value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

//Main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

//Set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

//Update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//GrandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};