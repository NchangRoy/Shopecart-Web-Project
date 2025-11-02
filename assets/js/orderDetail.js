document.addEventListener("DOMContentLoaded", () => {

  function readFields() {
    const firstName = document.querySelector(".firstname")?.value;
    const lastName = document.querySelector(".lastname")?.value;
    const email = document.querySelector(".email")?.value;
    const country_code = document.querySelector(".country_code")?.value || "";
    const phoneNumber = country_code + (document.querySelector(".phoneNumber")?.value);

    let deliveryOption = document.querySelector("input[name='delivery_option']:checked");
    if (deliveryOption) deliveryOption = deliveryOption.value;
    let pickUpStore
    if(deliveryOption==="Pick_up"){
      pickUpStore=document.querySelector(".pickup_store")?.value||""
    }
    const country=document.querySelector(".country")?.value
    const state = document.querySelector(".state")?.value;
    const city = document.querySelector(".city")?.value;
    const zipCode = document.querySelector(".zipCode")?.value;

    let paymentMethod = document.querySelector("input[name='payment']:checked");
    if (paymentMethod) paymentMethod = paymentMethod.value;


    let paymentInfo;
    if (paymentMethod === "mtn mobile money" || paymentMethod === "orange money") {
      paymentInfo = { paymentNumber: document.querySelector(".paymentNumber").value }
    } else if (paymentMethod === "card") {
      paymentInfo = {
        cardType: document.getElementById("cardType").value,
        cardHolder: document.querySelector(".cardHolder").value,
        cardNumber: document.querySelector(".cardNumber").value,
        CCV: document.querySelector(".CCV").value,
        ExpDate: document.querySelector(".expiryDate").value
      }
    }

    return {
      firstName,
      lastName,
      email,
      country_code,
      country,
      phoneNumber,
      deliveryType:deliveryOption,
      state,
      city,
      zipCode,
      paymentMethod,
      paymentInfo,
      pickUpStore
    };
  }

  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = readFields();
    console.log(data);
    localStorage.setItem("userData",JSON.stringify(data))
    window.location.href="ReviewPage.html"
  });

  const cardPayment = document.getElementById("Card_payment");
  const numberPayment = document.getElementById("Number_payment");

  const hide = () => {
    cardPayment.className = "disappear";
    numberPayment.className = "disappear";
   
  }

  hide(); // Start hidden

  document.querySelectorAll("input[name='payment']").forEach(option => {
    option.addEventListener("click", () => {
      hide();
      if (option.value === "mtn mobile money" || option.value === "orange money") {
        numberPayment.className = "Number_payment";
      } else if (option.value === "card") {
        cardPayment.className = "Card_payment";
      }
    });
  });

  const deliveryOptions = document.querySelectorAll('input[name="delivery_option"]');
  const pickUpStoreDiv = document.querySelector('.pickUpStore');
  const pickUpSelect = pickUpStoreDiv.querySelector('select');

  pickUpStoreDiv.style.display = "none"; 

  deliveryOptions.forEach(option => {
    option.addEventListener('change', () => {
      if (option.value === "Pick_up") {
        pickUpStoreDiv.style.display = "block";
        
      } else {
        pickUpStoreDiv.style.display = "none";
      }
    });
  });

  pickUpSelect.addEventListener('change', () => {
    console.log("Updated pickup store:", pickUpSelect.value);
  });

});
