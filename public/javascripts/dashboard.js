var ctx1 = document.getElementById('expenseCategories').getContext('2d');
var ctx2 = document.getElementById('annualMonthly').getContext('2d');
const thisYear = new Date().getFullYear();
let expenseCategoryData = [];
let annualMonthlyData = [];
const expenseElements = document.querySelectorAll('.expense');
const monthlyExpenseElements = document.querySelectorAll('.monthlyEx');
for (let i = 0; i < expenseElements.length; i++) {
  expenseCategoryData.push(Number(expenseElements[i].innerText));
}

for (let i = 0; i < monthlyExpenseElements.length; i++) {
  annualMonthlyData.push(Number(monthlyExpenseElements[i].innerText));
}
console.log(annualMonthlyData);
var expenseCategories = new Chart(ctx1, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: expenseCategoryData,
        backgroundColor: [
          'rgba(194, 174, 155, 0.8)',
          'rgba(96, 189, 178,0.8)',
          'rgba(181, 148, 235,0.8)',
          'rgba(235, 164, 148,0.8)',
          'rgba(235, 231, 148,0.8)'
        ],
        borderWidth: 0
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Home', 'Transport', 'Entertainment', 'Food', 'Others']
  },
  options: {
    // title: {
    //   display: true,
    //   text: 'Expense v.s Categories',
    //   fontSize: 18
    // }
  }
  //options: options
});

var annualMonthly = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    datasets: [
      {
        label: 'Amount',
        data: annualMonthlyData,
        backgroundColor: 'rgba(137, 170, 224, 0.8)'
      }
    ]
  },
  options: {
    // title: {
    //   display: true,
    //   text: `Monthly Expense in ${thisYear}`,
    //   fontSize: 18
    // },
    legend: {
      display: false
    }
  }
});
