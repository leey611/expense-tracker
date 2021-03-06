const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const categories = ['Home', 'Transport', 'Entertainment', 'Food', 'Others'];
const incomeCategories = ['Salary', 'Gift', 'Others'];
//enter the create new record page
router.get('/new', (req, res) => {
  res.render('new', { categories });
});

//POST create a new record
router.post('/new', (req, res) => {
  const userId = req.user._id;
  let { isExpense, merchant, name, date, category, amount } = req.body;

  isExpense = isExpense === 'Expense' ? true : false;

  Record.create({ isExpense, merchant, name, date, category, amount, userId })
    .then(res.redirect('/'))
    .catch((err) => console.log(err));
  //res.redirect('/');
});

//enter the edit record page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Record.findOne({ _id, userId }).then((record) => {
    const { _id, isExpense, merchant, name, date, category, amount } = record;
    let otherCategories;
    if (isExpense) {
      otherCategories = categories.filter((item) => item !== category);
    } else {
      otherCategories = incomeCategories.filter((item) => item !== category);
    }
    //const otherCategories = categories.filter((item) => item !== category);

    res.render('edit', {
      _id,
      isExpense,
      merchant,
      name,
      date,
      category,
      amount,
      otherCategories
    });
  });
});

//PUT update the record
router.put('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;

  const { isExpense, merchant, name, date, category, amount } = req.body;
  Record.findOne({ _id, userId })
    .then((record) => {
      record.isExpense = isExpense === 'Expense' ? true : false;
      record.merchant = merchant;
      record.name = name;
      record.date = date;
      record.category = category;
      record.amount = amount;
      return record.save();
    })
    .then(res.redirect('/'))
    .catch((err) => console.log(err));
});

//DELETE the record
router.delete('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .catch((err) => console.log(err));
  res.redirect('/');
});
module.exports = router;
