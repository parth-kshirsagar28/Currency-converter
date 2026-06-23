const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const from_dd = document.querySelector(".from select");
const to_dd = document.querySelector(".to select");
const btn = document.querySelector("#btnID");
const msg = document.querySelector(".result p");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = currCode;
    newOpt.value = currCode;

    select.append(newOpt);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

function updateFlag(element) {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");

  img.src = newsrc;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getExchange();
});

async function getExchange() {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;

  let first_c = from_dd.value;
  let sec_c = to_dd.value;

  const URL = `${BASE_URL}/${first_c.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(first_c, sec_c);

  let data = await response.json();
  console.log(data);

  let rate = data[first_c.toLowerCase()][sec_c.toLowerCase()];
  console.log(rate);

  let finalval = amtval * rate;

  msg.innerText = `${amtval} ${first_c} = ${finalval} ${sec_c}`;
}
