

const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");


const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");


const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let newAmount = 0;
for (let i = 0; i < 1; i++) {
  newAmount = loanAmount;
}
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);


let interest = interestRate / 12 / 100;


let myChart;

const checkValues = () => {
  let loanAmountValue =  loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "20000";
  }

  if (!loanTenureValue.match(regexNumber) || loanTenureValue > 360) {
    loanTenureInput.value = "180";
  }


  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "7.5";
  }

};

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  ctx.canvas.width = "350";
  ctx.canvas.height = "350";
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#050A30"],
          borderWidth: 2,
        },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;

  myChart.update();
  $("html, body").animate({ scrollTop: $("#slowDownPage").offset().top - 220 }, 1000);
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);

  interest = interestRate / 12 / 100;
  loanTenure1 = loanTenure * 12;

};

const calculateEMI = () => {
  checkValues();
  refreshInputValues();
  loanAmount = loanAmount;
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure1) /
      (Math.pow(1 + interest, loanTenure1) - 1));

  return emi;
};

const updateData = (emi) => {
  let emi1 = Math.floor(emi);
  loanEMIValue.innerHTML = emi1;
  document.getElementById('r11').innerHTML = convertToWords(emi1);

  let totalAmount = Math.floor(loanTenure1 * emi);
  totalAmountValue.innerHTML = totalAmount;
  document.getElementById('r13').innerHTML = convertToWords(totalAmount);

  let totalInterestPayable = Math.floor(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;
  document.getElementById('r12').innerHTML = convertToWords(totalInterestPayable);

  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const init = () => {
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);

function inWords(n) {
  const wordsMap = {
    0: "Zero",
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
  };

  const tensMap = {
    2: "Twenty",
    3: "Thirty",
    4: "Forty",
    5: "Fifty",
    8: "Eighty",
  };

  if (n in wordsMap) {
    return wordsMap[n];
  } else {
    const tens = Math.floor(n / 10);
    const ones = n % 10;

    let words = "";

    if (tens > 0) {
      words += tensMap[tens] || inWords(tens);
    }

    if (tens > 0 && ones > 0) {
      words += " ";
    }

    if (ones > 0) {
      words += inWords(ones);
    }

    return words;
  }
}


function convertToWords(n) {
  if (n === 0) {
    return "Zero";
  } else {
    const crores = Math.floor(n / 10000000);
    const lakhs = Math.floor((n % 10000000) / 100000);
    const thousands = Math.floor((n % 100000) / 1000);
    const hundreds = Math.floor((n % 1000) / 100);
    const tens = Math.floor((n % 100) / 10);
    const ones = n % 10;

    let words = "";

    if (crores > 0) {
      words += inWords(crores) + " Crore";
    }

    if (lakhs > 0) {
      if (words.length > 0) {
        words += " ";
      }
      words += inWords(lakhs) + " Lakh";
    }

    if (thousands > 0) {
      if (words.length > 0) {
        words += " ";
      }
      words += inWords(thousands) + " Thousand";
    }

    if (hundreds > 0) {
      if (words.length > 0) {
        words += " ";
      }
      words += inWords(hundreds) + " Hundred";
    }

    if (tens > 0) {
      if (words.length > 0) {
        words += " ";
      }
      words += inWords(tens * 10);
    }

    if (ones > 0) {
      if (words.length > 0) {
        words += " ";
      }
      words += inWords(ones);
    }

    return words;
  }
}













