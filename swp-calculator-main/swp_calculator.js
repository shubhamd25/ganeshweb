$(document).ready(function () {
    $("#SWPCalculatorForm").validate({
        ignore: [], debug: false, rules: { total_investment: { required: true, digits: true, min: 10000 }, withdrawal_per_month: { required: true, digits: true, min: 500 }, expected_return_rate: { required: true, number: true, min: 1, max: 100 }, time_period: { required: true, digits: true, min: 1, max: 100 } }, messages: { cktext: { required: "Please enter Description.", minlength: "Please enter 10 minimum characters." } }, submitHandler: function (form) {
            let O_TI = document.getElementById("r1"); let O_TW = document.getElementById("r2"); let O_FV = document.getElementById("r3"); let TI = Number($('#total_investment').val()); let WPM = Number($('#withdrawal_per_month').val()); let ROI = Number($('#expected_return_rate').val()); let T = Number($('#time_period').val()); let TW = WPM * T * 12; if (TI >= 10000 && WPM >= 500 && ROI >= 1) { let FV = Math.round(TI * Math.pow(1 + ROI / 100, T) - (WPM * (Math.pow(1 + (Math.pow(1 + ROI / 100, 1 / 12) - 1), T * 12) - 1)) / (Math.pow(1 + ROI / 100, 1 / 12) - 1)); O_TI.innerHTML = "₹" + TI.toLocaleString('en-IN'); O_TW.innerHTML = "₹" + TW.toLocaleString('en-IN'); O_FV.innerHTML = "₹" + FV.toLocaleString('en-IN'); }
            $("html, body").animate({ scrollTop: $("#slowDownPage").offset().top - 220 }, 1000);
        }
    });
});