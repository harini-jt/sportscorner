first();
function password(){
 var pwd = document.getElementById("pwd").value;
 var rpwd = document.getElementById("rpwd").value;
 if(pwd=="" || rpwd =="")
 {document.getElementById("error").innerText="*Enter Password"
 return false;}
 else if(pwd!==rpwd)
  {document.getElementById("error").innerText="*Passwords did not match."
   return false;
  }
 else if(pwd.length<6)
  {document.getElementById("error").innerText="*Password should be atleast 6 characters."
   return false;
   }
 return true;
}
function mobile_number(){
    var mobile = document.getElementById("ph").value;
     var num = /^[0-9]{10}$/;
     if(mobile.match(num))
      {return true;}
     else
     {document.getElementById("error").innerText="*Please Enter a valid Mobile number (10 digits).";
      return false;}

    }
function validate_form(){
var p = password();
var m = mobile_number();
var success_msg = "<h1>"+"YOU'VE SUCCESSFULLY CREATED AN ACCOUNT!!"+"</h1>";
if(p && m)
  document.write(success_msg);
else 
 alert("SOMETHING WENT WRONG TRY AGIAN.");
}
function login(){
    document.getElementById('signupform').style.display='none';
    document.getElementById("loginform").style.display="block";
}
function login_success(){
    document.getElementById("loginform").style.display='none';
    alert("Successfully Signed in.")
    window.location.href="store.html";
}

function signup(){
    document.getElementById('signupform').style.display='block';
    document.getElementById("loginform").style.display="none";
}

//for cart and products store.js file functions
function first() {
    var rembtns = document.getElementsByClassName('removebtn')
    for (var i = 0; i < rembtns.length; i++) {
        var button = rembtns[i]
        button.addEventListener('click', removeItem)
    }

    var Q = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < Q.length; i++) {
        var  input= Q[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('addbtn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase)

}

function purchase() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('c-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    totalUpdate();
}

function removeItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    totalUpdate();
}

function quantityChanged(event) {
    var input = event.target
    if (input.value <= 0) {
        input.value = 1
    }
    totalUpdate();
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-img')[0].src
    addItemToCart(title, price, imageSrc)
    totalUpdate();
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('c-row')
    var cartItems = document.getElementsByClassName('c-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price">${price}</span>
        <div class="cart-quantity">
            <input class="cart-quantity-input" type="number" value="1" style="width:30px;">
            <button class="removebtn" type="button" style="margin-left:40px;">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('removebtn')[0].addEventListener('click', removeItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function totalUpdate() {
    var cartItem = document.getElementsByClassName('c-items')[0];
    var cartRows = cartItem.getElementsByClassName('c-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('₹', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    //total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total;
}