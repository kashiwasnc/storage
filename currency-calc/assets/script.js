const currency1 = document.getElementById('currency1');
const amount1 = document.getElementById('amount1');
const currency2 = document.getElementById('currency2');
const amount2 = document.getElementById('amount2');
const rateText = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
  const currencyA = currency1.value;
  const currencyB = currency2.value;
  fetch("https://open.er-api.com/v6/latest/USD")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const currentRate = (data.rates[currencyB] / data.rates[currencyA]).toFixed(6);
      rateText.innerText = `1 ${currencyA} = ${currentRate} ${currencyB}`;
      amount2.value = (amount1.value * (currentRate)).toFixed(3);
    });
}

calculate();

// 通貨と金額を変更した時
currency1.addEventListener('change', calculate);
amount1.addEventListener('input', calculate);
currency2.addEventListener('change', calculate);
amount2.addEventListener('input', calculate);

// 通貨の入替え時
swap.addEventListener('click', () => {
  const temp = currency1.value;
  currency1.value = currency2.value;
  currency2.value = temp;
  calculate();
});
