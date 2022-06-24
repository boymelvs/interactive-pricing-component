"use strict";

const pageviews = { 0: "10K", 25: "50K", 50: "100K", 75: "500K", 100: "1M" };

const pricePerMonth = { 0: 8.0, 25: 12.0, 50: 16, 75: 24, 100: 36 };

const getSlider = document.getElementById("price_range");
const getNumView = document.querySelector(".num_views");
const getPrice = document.querySelector(".price");
const getBilling = document.getElementById("switch_billing");
const getInputs = document.querySelectorAll(".input");

const isDiscounted = (value, price) => {
   let newPrice = price;

   if (getBilling.checked) {
      newPrice = price * 0.75;
   }

   getNumView.textContent = pageviews[value];
   getPrice.textContent = Number(newPrice).toFixed(2);

   let color = `linear-gradient(90deg, var(--soft-cyan) ${value}%, var(--light-grayish-blue-empty) ${value}%)`;

   getSlider.style.background = color;
};

const eventListener = (elem) => {
   let value, price;

   elem.addEventListener("change", (e) => {
      value = e.target.value;
      price = pricePerMonth[value];

      if (elem.classList.contains("toggle")) {
         value = getSlider.value;
         price = pricePerMonth[value];
      }

      isDiscounted(value, price);
   });

   if (elem.classList.contains("price_range")) {
      elem.addEventListener("mousemove", (e) => {
         value = e.target.value;
         price = pricePerMonth[value];

         isDiscounted(value, price);
      });
   }
};

getInputs.forEach((input) => {
   eventListener(input);
});
