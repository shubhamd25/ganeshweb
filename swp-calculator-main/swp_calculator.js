$(document).ready(function () {
    $("#SWPCalculatorForm").validate({
        ignore: [], debug: false, rules: { total_investment: { required: true, digits: true, min: 10000 }, withdrawal_per_month: { required: true, digits: true, min: 500 }, expected_return_rate: { required: true, number: true, min: 1, max: 100 }, time_period: { required: true, digits: true, min: 1, max: 100 } }, messages: { cktext: { required: "Please enter Description.", minlength: "Please enter 10 minimum characters." } }, submitHandler: function (form) {
            let O_TI = document.getElementById("r1"); let O_TW = document.getElementById("r2"); let O_FV = document.getElementById("r3"); let TI = Number($('#total_investment').val()); let WPM = Number($('#withdrawal_per_month').val()); let ROI = Number($('#expected_return_rate').val()); let T = Number($('#time_period').val()); let TW = WPM * T * 12; if (TI >= 10000 && WPM >= 500 && ROI >= 1) { let FV = Math.round(TI * Math.pow(1 + ROI / 100, T) - (WPM * (Math.pow(1 + (Math.pow(1 + ROI / 100, 1 / 12) - 1), T * 12) - 1)) / (Math.pow(1 + ROI / 100, 1 / 12) - 1)); O_TI.innerHTML = "₹" + TI.toLocaleString('en-IN') + " " + "("+inWords(TI) + ")"; O_TW.innerHTML = "₹" + TW.toLocaleString('en-IN')+ " " + "("+inWords(TW) + ")"; O_FV.innerHTML = "₹" + FV.toLocaleString('en-IN') + " " + "("+inWords(FV) + ")";}
            
            $("html, body").animate({ scrollTop: $("#slowDownPage").offset().top - 220 }, 1000);
        }
    });
});

var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = ' ';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only' : '';
    return str;
  }