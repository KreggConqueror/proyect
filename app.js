const productsContainer = document.getElementById("products-container");
const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* RENDER PRODUCTOS */

function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `
      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

          <h3>${product.name}</h3>

          <p class="price">$${product.price}</p>

          <button class="add-to-cart" onclick="addToCart(${product.id})">
            Agregar al carrito
          </button>

        </div>

      </div>
    `;
  });
}

/* AGREGAR AL CARRITO */

function addToCart(id) {
  const product = products.find((p) => p.id === id);

  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart();
}

/* GUARDAR */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

/* RENDER CARRITO */

function renderCart() {
  cartItemsContainer.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    totalItems += item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">

        <img src="${item.image}" alt="${item.name}">

        <div class="cart-item-info">

          <h4>${item.name}</h4>

          <p>$${item.price}</p>

          <div class="quantity-controls">

            <button onclick="changeQuantity(${item.id}, -1)">
              -
            </button>

            <span>${item.quantity}</span>

            <button onclick="changeQuantity(${item.id}, 1)">
              +
            </button>

          </div>

          <button class="remove-btn" onclick="removeItem(${item.id})">
            Eliminar
          </button>

        </div>

      </div>
    `;
  });

  cartTotal.textContent = total;
  cartCount.textContent = totalItems;
}

/* CAMBIAR CANTIDAD */

function changeQuantity(id, change) {
  const item = cart.find((p) => p.id === id);

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((p) => p.id !== id);
  }

  saveCart();
}

/* ELIMINAR */

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();
}

/* MODAL */

cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

/* WHATSAPP */

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");

    return;
  }

  let message = "Hola, quiero realizar el siguiente pedido:%0A%0A";

  cart.forEach((item) => {
    message += `• ${item.name} x${item.quantity} - $${item.price * item.quantity}%0A`;
  });

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  message += `%0A Total: $${total}`;

  // CAMBIA ESTE NÚMERO
  const phone = "5217222034684";

  const whatsappURL = `https://wa.me/${phone}?text=${message}`;

  window.open(whatsappURL, "_blank");
});

/* INIT */

renderProducts();
renderCart();
