// Fetch and Display Data
let fetchdata = async () => {
  let url = 'http://localhost:3000/RoyalCafe';
  let res = await fetch(url, { method: "GET" });
  let data = await res.json();

  // console.log(data);
  datashow(data)
}

let searchhh=async()=>{
  let searchinp = document.querySelector("#searchh").value.toLowerCase()
  let url = 'http://localhost:3000/RoyalCafe'
   let res = await fetch(url, { method: "GET" });
   let data = await res.json();
   data.filter((e)=>{

    return e.name.toLowerCase().includes(searchinp)

   })

}

let datashow=(data)=>{

  let datashow = document.querySelector("#usedata");
  datashow.innerHTML = "";

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

// Delete function
let del = async (id) => {
  let url = `http://localhost:3000/RoyalCafe/${id}`;
  await fetch(url, { method: "DELETE" });
  fetchdata();
};

// Call once on page load
fetchdata();

// Royal Café Order System - Full Cart Functionality
let cart = [];

let addButtons = document.querySelectorAll(".add-btn");
let cartItemsContainer = document.querySelector(".cart-items");
let emptyCartMessage = document.querySelector(".empty-cart");
let orderTotalContainer = document.querySelector(".order-total");
let checkoutButton = document.querySelector(".checkout-btn");

// Add to Cart
addButtons.forEach(button => {
  button.addEventListener("click", () => {
    let itemElement = button.closest(".menu-item");
    let name = itemElement.querySelector("h3").textContent;
    let price = parseInt(itemElement.querySelector(".price").textContent.replace("₹", ""));
    let image = itemElement.querySelector("img").src;

    let existingItem = cart.find(item => item.name === name);
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

// Update Cart UI
let updateCartUI = () => {
  if (cart.length === 0) {
    cartItemsContainer.style.display = "none";
    orderTotalContainer.style.display = "none";
    checkoutButton.style.display = "none";
    emptyCartMessage.style.display = "block";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    let cartItem = document.createElement("div");
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

  let taxes = Math.round(subtotal * 0.1);
  let deliveryFee = 40;
  let total = subtotal + taxes + deliveryFee;

  orderTotalContainer.innerHTML = `
    <div class="total-row"><span>Subtotal:</span><span>₹${subtotal}</span></div>
    <div class="total-row"><span>Delivery Fee:</span><span>₹${deliveryFee}</span></div>
    <div class="total-row"><span>Taxes:</span><span>₹${taxes}</span></div>
    <div class="total-row grand-total"><span>Total:</span><span>₹${total}</span></div>
  `;

  cartItemsContainer.style.display = "block";
  orderTotalContainer.style.display = "block";
  checkoutButton.style.display = "block";
  emptyCartMessage.style.display = "none";
};

// Checkout
checkoutButton.addEventListener("click", () => {
  alert("Thanks for your order! 🎉");
  cart = [];
  updateCartUI();
});


let checkk=()=>{

}