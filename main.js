/*let http=new XMLHttpRequest();

http.open('get','products.json',true);

http.send();

http.onload=function(){
    if(this.readyState == 4 && this.status == 200){
        let products=JSON.parse(this.responseText);
        let output="";

        for(let item of products){
            output +='<div class="products">'+
             '<img src="${item.image}" alt="${item.image}">'+
             '<p class="title">${item.title</p>'+
             '<p class="description">${item.description}</p>'+
             '<p class="price"><span>${item.price}</span><span>&euro</span></p>'+
             '<p class="cart">Add to Cart<i class="bx bx-cart-alt"></i></p>'+
             '</div>';
            
        }
       document.querySelector(".products").innerHTML=output;
    }
}*/
$(document).ready(function(e){
    jsonObject.products.forEach((i)=>loadProducts(i));
});

function loadProducts(data){
    var li=document.createElement('li');

    li.innerHTML=`<div class="shop-content">
    <div class="product-box">
    <img class="product-img" alt="" src="${data.image}">
    <h6 class="product-title">${data.title}</h6>
    <p class="product-description"> <${data.description}</p>
    <p class="product-price">$${data.price}</p>
     <i class="bx bx-cart-alt add-cart">Add to cart</span>
    </div>
    <div>`;

 document.getElementById("home_product").appendChild(li);
}
let cartIcon=document.querySelector('#cart-icon');
let cart=document.querySelector('#cart');
let closeCart=document.querySelector('#close-cart');

cartIcon.onclick = ()=> {
    cart.classList.add("active");
};
closeCart.onclick =() => {
    cart.classList.remove("active");
}
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded",ready);
}else {
    ready();
}
function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons);
    for(var i=0; i<removeCartButtons.length;i++){
    var button = removeCartButtons[i];
    button.addEventlistener("click",removeCartItem);
    }

var quantityInputs = document.getElementsByClassName("cart-quantity");
for(var i=0; i<quantityInputs.length; i++){
    var Input = quantityInputs[i];
    Input.addEventListener("change",quantityChanged);
}

var addCart = document.getElementsByClassName("add-cart");
for(var i=0; i< addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click",addCartClicked);
}
document
.getElementsByClassName("btn-buy")[0]
.addEventListener("click",buyButtonClicked);
}

function buyButtonClicked() {
    alert("your order is Placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event) {
    var buttonClicked =event.target;
    buttonClicked.parentelement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <=0){
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title=shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price=shopProducts.getElementsByClassName("prouct-img")[0].innerText;
    var productImg=shopProducts.getElementsByClassName("prouct-img")[0].src;

    addProductToCart(title,price,productImg);
    updatetotal();

}

function addProductToCart(title,price,productImg) {
    var cartShopBox = document.createElement("div");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames= cartItems.getElementsByClassName("cart-product-title");
    for(var i=0; i < cartItemsNames.length; i++) { 
        if(cartItemsNames[i].innerText == title) {
    alert("Y0u have already add this item to cart");
    return;
    }
}

var cartBoxContent=`
<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
<div class="cart-product-title">${title}</div>
<div class="cart-product-price">$${price}</div>
<input type="number" value="1" class="cart-quantity">
<i class="bx bxs-trash-alt cart-remove"></i>
</div>
`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox
.getElementsByClassName('cart-remove')[0]
.addEventListener('click',removeCartitem);
cartShopBox
.getElementsByClassName('cart-quantity')[0]
.addEventListener('click',quantityChanged);
}

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total=0;
    for(var i=0; i<cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price=parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.ariaValueMax;
        total=total + (price * quantity);
        total= Math.round(total*100) /100;

        document.getElementsByClassName('total-price')[0].innerText = "$"+total;
    }
}