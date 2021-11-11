/*var remove = document.getElementByClassName('remove');
for(var i=0;i<remove.length;i++)
{
    var button = remove[i];
    button.addEventListener('click', function(e){
        console.log('clicked');
        var btntoremove = e.target;
        btntoremove.parentElement.parentElement.remove();

    })
}*/ 
//fucntion totalupdate(){}

function toadd(event){
    alert("hi");
    var button = even.target;
    var item = button.parentElement;
    var title = item.getElementByClassName('title')[0].innerText;
    var price = item.getElementByClassName('amount')[0].innerText;
    var imgsrc = item.getElementByClassName('item-img')[0].src;
    alert(title);
    alert(price);
    alert(imgsrc);
    addtocart(title,price,imgsrc);
   // totalupdate();
}
/*
function addtocart(){
    var cartRow = document.createElement('div')
    cartRow.classList.add('row')
    var cartItems = document.getElementsByClassName('c-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}*/
