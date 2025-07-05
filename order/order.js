let fetchdata = async () => {
  let url = 'http://localhost:3000/RoyalCafe';

  let res = await fetch(url, { method: "GET" });
  let data = await res.json();

  console.log(data);

  let datashow = document.querySelector("#usedata");
  datashow.innerHTML = ""; // Clear previous data

  data.map((e) => {
    datashow.innerHTML += `
      <tr>
        <td>${e.name}</td>
        <td>₹${e.price}</td>
        <td>${e.category}</td>
        <td>${e.description}</td>
        <td><img src="${e.image}" width="50" /></td>
        <td onclick="del(${e.id})" style="cursor: pointer; color: red;">Delete</td>
      </tr>
    `;
  });
};

let del = async (id) => {
  let url = `http://localhost:3000/RoyalCafe/${id}`;
  await fetch(url, { method: "DELETE" });
  fetchdata(); // Refresh list after delete
};

// Call once on page load
fetchdata();





// Royal Café Order System - Full Cart Functionality

let cart = [];

// Select all Add to Cart buttons
const addButtons = document.querySelectorAll(".add-btn");
const cartItemsContainer = document.querySelector(".cart-items");
const emptyCartMessage = document.querySelector(".empty-cart");
const orderTotalContainer = document.querySelector(".order-total");
const checkoutButton = document.querySelector(".checkout-btn");

// Add to Cart button click
addButtons.forEach(button => {
  button.addEventListener("click", () => {
    const itemElement = button.closest(".menu-item");
    const name = itemElement.querySelector("h3").textContent;
    const price = parseInt(itemElement.querySelector(".price").textContent.replace("₹", ""));
    const image = itemElement.querySelector("img").src;

    // Check if item already in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1,
        image: image
      });
    }

    updateCartUI();
  });
});

// Update the cart UI
function updateCartUI() {
  // Empty cart message
  if (cart.length === 0) {
    cartItemsContainer.style.display = "none";
    orderTotalContainer.style.display = "none";
    checkoutButton.style.display = "none";
    emptyCartMessage.style.display = "block";
    return;
  }

  // Clear current cart items
  cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity}</p>
            </div>
            <div class="item-price">₹${item.price * item.quantity}</div>
        `;
    cartItemsContainer.appendChild(cartItem);
  });

  const taxes = Math.round(subtotal * 0.1); // 10% tax
  const deliveryFee = 40;
  const total = subtotal + taxes + deliveryFee;

  orderTotalContainer.innerHTML = `
        <div class="total-row"><span>Subtotal:</span><span>₹${subtotal}</span></div>
        <div class="total-row"><span>Delivery Fee:</span><span>₹${deliveryFee}</span></div>
        <div class="total-row"><span>Taxes:</span><span>₹${taxes}</span></div>
        <div class="total-row grand-total"><span>Total:</span><span>₹${total}</span></div>
    `;

  // Show UI
  cartItemsContainer.style.display = "block";
  orderTotalContainer.style.display = "block";
  checkoutButton.style.display = "block";
  emptyCartMessage.style.display = "none";
}

checkoutButton.addEventListener("click", () => {
  alert("Thanks for your order! 🎉");
  cart = [];
  updateCartUI();
});