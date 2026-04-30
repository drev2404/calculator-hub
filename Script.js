// BASIC
function runBasic() {
  let val = document.getElementById("calcInput").value;
  document.getElementById("calcResult").innerText = eval(val);
}

// TIP
function tipCalc() {
  let bill = parseFloat(document.getElementById("bill").value);
  let tip = parseFloat(document.getElementById("tip").value);
  let result = bill * (tip / 100);
  document.getElementById("tipResult").innerText = "Tip: $" + result.toFixed(2);
}

// BMI
function bmiCalc() {
  let w = parseFloat(document.getElementById("weight").value);
  let h = parseFloat(document.getElementById("height").value);
  let bmi = w / (h * h);
  document.getElementById("bmiResult").innerText = "BMI: " + bmi.toFixed(2);
}

// LOAN
function loanCalc() {
  let p = parseFloat(document.getElementById("loan").value);
  let r = parseFloat(document.getElementById("interest").value) / 100 / 12;
  let n = parseFloat(document.getElementById("years").value) * 12;

  let x = Math.pow(1 + r, n);
  let monthly = (p * x * r) / (x - 1);

  document.getElementById("loanResult").innerText =
    "Monthly Payment: $" + monthly.toFixed(2);
}
