const tipPercentages = document.querySelectorAll(".tip-percentage");
const billInput = document.getElementById("bill");
const numPeopleInput = document.getElementById("people");
const resetButton = document.getElementById("reset");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const form = document.querySelector("form");
billInput.value = 0;
numPeopleInput.value = 0;

let selectedTipPercentage = 0;
const customTipInput = document.getElementById("custom");

function handleTipSelect(selected, arr) {
  for (let input of arr) {
    if (input.checked) {
      input.checked = false;
      selected.checked = true;
      selectedTipPercentage = parseInt(selected.id) / 100;
    } else if (selected == input) {
      console.log("wat");
      selected.checked = false;
    }
  }
}

function handleReset() {
  billInput.value = 0;
  numPeopleInput.value = 0;
  for (let input of tipPercentages) {
    if (input.checked) {
      input.checked = false;
    } else if (input.value > 0) {
      input.value = 0;
    }
    tipAmount.textContent = "0";
    totalAmount.textContent = "0";
  }
}

function displayResult() {
  if (
    billInput.value > 0 &&
    numPeopleInput.value > 0 &&
    selectedTipPercentage > 0
  ) {
    tipAmount.textContent = calcTip().toFixed(2).toString();
    totalAmount.textContent = calcTotal().toFixed(2).toString();
  }
}

function calcTip() {
  let tip =
    (parseInt(billInput.value) / parseInt(numPeopleInput.value)) *
    selectedTipPercentage;
  return tip;
}

function calcTotal() {
  let total =
    parseInt(billInput.value) / parseInt(numPeopleInput.value) + calcTip();
  return total;
}

tipPercentages.forEach((input) => {
  input.addEventListener("click", (e) => {
    handleTipSelect(e.target, tipPercentages);
  });
  input.addEventListener("change", (e) => {
    displayResult();
  });
});

billInput.addEventListener("change", (e) => {
  displayResult();
});

numPeopleInput.addEventListener("change", (e) => {
  displayResult();
});

customTipInput.addEventListener("change", (e) => {
  selectedTipPercentage = parseInt(customTipInput.value) / 100;
  displayResult();
});

resetButton.addEventListener("click", (e) => {
  handleReset();
});
