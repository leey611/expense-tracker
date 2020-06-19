const categories = ['Home', 'Transport', 'Entertainment', 'Food', 'Others'];
function convertIcon(category) {
  if (category === 'Home') {
    return '<i class="fas fa-home" style="color:#457B9D"></i>';
  } else if (category === 'Transport') {
    return '<i class="fas fa-bus" style="color:#457B9D"></i>';
  } else if (category === 'Entertainment') {
    return '<i class="fas fa-grin-beam" style="color:#457B9D"></i>';
  } else if (category === 'Food') {
    return '<i class="fas fa-utensils" style="color:#457B9D"></i>';
  } else if (category === 'Others') {
    return '<i class="fas fa-pen" style="color:#457B9D"></i>';
  }
}

//let categoryElementsText = document.getElementById('categoryIcon').innerText;

//console.log(convertIcon(categoryElementsText));
// document.getElementById('categoryIcon').innerHTML = convertIcon(
//   categoryElementsText
// );

categoryElements = document.getElementsByClassName('categoryIcon');
for (let i = 0; i < categoryElements.length; i++) {
  categoryElements[i].innerHTML = convertIcon(categoryElements[i].innerText);
}
