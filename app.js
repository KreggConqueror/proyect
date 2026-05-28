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

        <img src="${product.image}">

        <div class="product-info">

          <h3>${product.name}</h3>

          <span class="unitalla">
            UNITALLA
          </span>

          <p>
            ${product.description}
          </p>

          <p class="price">
            $${product.price}
          </p>

          <button
            class="add-to-cart"
            onclick="addToCart(${product.id})"
          >

            Agregar al carrito

          </button>

        </div>

      </div>

    `;
  });
}

/* AGREGAR */

function addToCart(id) {
  const product = products.find((p) => p.id === id);

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity++;
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

  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    count += item.quantity;

    cartItemsContainer.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}">

        <div class="cart-item-info">

          <h4>${item.name}</h4>

          <p>
            Unitalla
          </p>

          <p>
            $${item.price}
          </p>

          <div class="quantity-controls">

            <button
              onclick="changeQuantity(${item.id},-1)"
            >
              -
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="changeQuantity(${item.id},1)"
            >
              +
            </button>

          </div>

          <button
            class="remove-btn"
            onclick="removeItem(${item.id})"
          >

            Eliminar

          </button>

        </div>

      </div>

    `;
  });

  cartTotal.textContent = total;

  cartCount.textContent = count;
}

/* CANTIDAD */

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

/* ABRIR MODAL */

cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

/* CERRAR MODAL */

closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

/* CLICK AFUERA */

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

/* WHATSAPP */

checkoutBtn.addEventListener("click", () => {
  if (cart.length <= 0) {
    alert("Tu carrito está vacío");

    return;
  }

  let message = "🛒 *NUEVO PEDIDO* %0A%0A";

  cart.forEach((item) => {
    message += `📦 *${item.name}*%0A`;

    message += `Cantidad: ${item.quantity}%0A`;

    message += `Talla: Unitalla%0A`;

    message += `Precio: $${item.price * item.quantity}%0A`;

    message += `Foto: ${item.image}%0A%0A`;
  });

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  message += `💰 *TOTAL:* $${total}`;

  /* CAMBIA TU NUMERO */

  const phone = "5217222034684";

  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
});

/* INIT */

renderProducts();

renderCart();
