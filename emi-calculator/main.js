

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
  let loanAmountValue = loanAmountInput.value;
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

const updateChart = (totalInterestPayableValue, processingFees) => {
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
  loanEMIValue.innerHTML = Math.ceil(emi);

  let processingFees = 0;

  let totalDownPay = 0;


  let totalAmount = Math.ceil(loanTenure1 * emi);
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.ceil(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if (myChart) {
    updateChart(totalInterestPayable, processingFees);
  } else {
    displayChart(totalInterestPayable, processingFees);
  }
};

const init = () => {
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);
