const cartIcon = document.querySelector("#cart-icon")
const cart = document.querySelector(".cart")
const cartClose = document.querySelector("#cart-close")
cartIcon.addEventListener("click",()=>{
cart.classList.add("active")
});
cartClose.addEventListener("click",()=>{
cart.classList.remove("active")
});

const addCartBtn = document.querySelectorAll(".add-cart");
addCartBtn.forEach(button =>{
    button.addEventListener("click",event =>{
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});
 const cartContent = document.querySelector(".cart-content")
const addToCart = productBox =>{
    const productImgsrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;
    const cartItem = cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItem){ 
        if(item.textContent === productTitle){
            alert("this item already in the cart");
            return;
        }
    }
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML=`
        <img src="${productImgsrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click",()=>{
        cartBox.remove();
        updateCartCount(-1);
        updateProduct();
    })
    cartBox.querySelector(".cart-quantity").addEventListener("click",event =>{
    const numberElement = cartBox.querySelector(".number");
    const decrementBtn = cartBox.querySelector("#decrement");
    const incrementBtn = cartBox.querySelector("#increment");
    let quantity = numberElement.textContent;

    if(event.target.id === "decrement" && quantity>1){
        quantity --;
        if(quantity === 1){
            decrementBtn.style.color ="red";
        }
    }else if(event.target.id === "increment"){
        quantity ++;
        decrementBtn.style.color = "blue";
        incrementBtn.style.color = "green"
    }
    numberElement.textContent = quantity;
    updateProduct();
    
});
updateCartCount(1);
updateProduct();
};

const updateProduct = () =>{
    const totalPrice = document.querySelector(".totel-price");
    const cartBoxs = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxs.forEach(cartBox =>{
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("$","");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPrice.textContent = `$${total}`;
};
let cartItemCount = 0;
const updateCartCount = change =>{
    const cartItemBadge =  document.querySelector(".cart-item-count");
    cartItemCount += change;
    if(cartItemCount > 0){
        cartItemBadge.style.visibility = "visible";
        cartItemBadge.textContent = cartItemCount;
    }else{
        cartItemBadge.style.visibility = "hidden";
        cartItemBadge.textContent = "";
    }
};
const buyBtn = document.querySelector(".btn-buy");
buyBtn.addEventListener("click",()=>{
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length === 0){
        alert("Your cart is Empty.");
        return
    }
    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount=0;
    updateCartCount(0);
    updateProduct();
    alert("Thank You For Your Purchase!");

});
