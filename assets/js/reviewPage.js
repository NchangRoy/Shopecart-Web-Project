
const dataread=JSON.parse(localStorage.getItem("userData"))
console.log(dataread)
const cartItems=JSON.parse(localStorage.getItem("cartData"))
const data=dataread!=null?{
        ...dataread
}:{
    
    firstName:"fureh",
    lastName:"mitoto",
    email:"furehmitoto@gmail.com",
    phoneNumber:"+237683456789",
    deliveryType:"Pick Up",
    pickUpStore:"St.Mac Jewelriess",
    country:"Cameroon",
    city:"Yaounde",
    state:"Centre",
    zipCode: "11233",
    paymentMethod:"mtn mobile money",
    
    paymentInfo:{
        paymentNumber:6830213842
    },
    
    

}


const cartData=cartItems?cartItems:{
    cartItems:[
        {image:"./assets/images/headphone.jpeg",
        name:"HeadPhones Max",
        unitPrice:55.99,
        quantity:4,
        color:"red"},
        {image:"./assets/images/headphone.jpeg",
        name:"HeadPhones Max",
        unitPrice:550.99,
        quantity:4,
        color:"red"},
        ,
        {image:"./assets/images/headphone.jpeg",
        name:"HeadPhones Max",
        unitPrice:550.99,
        quantity:4,
        color:"red"},
        {image:"./assets/images/headphone.jpeg",
        name:"HeadPhones Max",
        unitPrice:550.99,
        quantity:4,
        color:"red"},
        {image:"./assets/images/headphone.jpeg",
        name:"HeadPhones Max",
        unitPrice:550.99,
        quantity:4,
        color:"red"}
    ]

    ,tax: 200.99,
    delivery: 64.34,
    discount: 25.53
}

document.querySelector(".firstName").textContent = data.firstName;
document.querySelector(".lastName").textContent = data.lastName;
document.querySelector(".email").textContent = data.email;
document.querySelector(".phoneNumber").textContent = data.phoneNumber;
document.querySelector(".deliveryType").textContent = data.deliveryType;
document.querySelector(".pickUpStore").textContent = data.pickUpStore;
document.querySelector(".country").textContent = data.country;
document.querySelector(".city").textContent = data.city;
document.querySelector(".state").textContent = data.state;
document.querySelector(".zipCode").textContent = data.zipCode;
document.querySelector(".paymentMethod").textContent = data.paymentMethod;
if(data.deliveryType!="Pick_up"){
    document.querySelector(".pickup_store").style.display="none"
}
console.log("loaded")

 let subTotal=0;

let itemdiv=document.querySelector(".items")
cartData.cartItems?.forEach(item =>{
    let div=document.createElement("div")
    div.className="item"
    div.innerHTML=`
                    <img src="${item.image}" alt="${item.image}">
                    <div class=" Details">
                        <div class="top">${item.name}</div>
                        <div>color: ${item.color}</div>
                    </div>
                     <div class=" Details">
                        <div class="top">$${item.unitPrice}</div>
                        <div>Quantity: ${item.quantity}</div>
                    </div>
                `
    itemdiv.appendChild(div)
    subTotal+=item.unitPrice*item.quantity

})

let total=subTotal+cartData.tax+cartData.discount+cartData.delivery

document.querySelector(".subTotal").textContent=subTotal;
document.querySelector(".discount").textContent=cartData.discount
document.querySelector(".tax").textContent=cartData.tax
document.querySelector(".delivery").textContent=cartData.delivery

document.querySelector(".TotalValue").textContent=total


let paymentDetailDiv=document.getElementById("payment_details")
if(data.paymentMethod==="mtn mobile money"|| data.paymentMethod==="orange money"){
    paymentDetailDiv.innerHTML=`
    <div class="info_box">
    <div class="field"> Payment Number</div>
    <div class="paymentNumber"> ${data.paymentInfo.paymentNumber}</div>
    </div>
    `
}else if(data.paymentMethod==="card"){
    paymentDetailDiv.innerHTML = `
        <div class="info_box">
        <div class="field">Card Type</div>
        <div class="paymentNumber">${data.paymentInfo.cardType}</div>
        </div>

        <div class="info_box">
        <div class="field">Card Holder</div>
        <div class="paymentNumber">${data.paymentInfo.cardHolder}</div>
        </div>

        <div class="info_box">
        <div class="field">Card Number</div>
        <div class="paymentNumber">${data.paymentInfo.cardNumber}</div>
        </div>

        <div class="info_box">
        <div class="field">CCV</div>
        <div class="paymentNumber">${data.paymentInfo.CCV}</div>
        </div>

        <div class="info_box">
        <div class="field">Expiry Date</div>
        <div class="paymentNumber">${data.paymentInfo.ExpDate}</div>
        </div>
      `;
}



