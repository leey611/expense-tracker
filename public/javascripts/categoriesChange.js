const incomeOrExpenseElement = document.getElementById('expenseOrIncome');
const incomeCategories = ['Salary', 'Gift', 'Others'];
const expenseCategories = [
  'Home',
  'Transport',
  'Entertainment',
  'Food',
  'Others'
];
const recordCategoryElement = document.getElementById('recordCategory');

function changeExpenseOrIncome() {
  if (incomeOrExpenseElement.value === 'Income') {
    recordCategoryElement.innerHTML = '';
    recordCategoryElement.innerHTML += incomeCategories.map(
      (category) => `<option>${category}</option>`
    );
  } else {
    recordCategoryElement.innerHTML = '';
    recordCategoryElement.innerHTML += expenseCategories.map(
      (category) => `<option>${category}</option>`
    );
  }
}
