const totalExpenseText = document.getElementById('totalExpense').innerText;
const totalIncomeText = document.getElementById('totalIncome').innerText;
const totalExpenseAmount = Number(totalExpenseText);
const totalIncomeAmount = Number(totalIncomeText);

var ctx = document.getElementById('myChart').getContext('2d');

var myDoughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [totalIncomeAmount, totalExpenseAmount],
        backgroundColor: ['rgba(17, 153, 28, 0.8)', 'rgba(173, 40, 40,0.8)'],
        borderWidth: 0
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Income', 'Expense']
  }
  //options: options
});
