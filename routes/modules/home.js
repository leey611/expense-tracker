const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const categories = ['Home', 'Transport', 'Entertainment', 'food', 'others'];
const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

router.get('/', (req, res) => {
  Record.find()
    .sort('_id')
    .lean()
    .then((records) => {
      let totalExpense = 0;
      let totalIncome = 0;
      //map through all the expense and add them together
      records.map(
        (record) => (totalExpense += record.isExpense && record.amount)
      );
      //map through all the income and add them together
      records.map(
        (record) => (totalIncome += !record.isExpense && record.amount)
      );
      //balance
      let balanceAmount = totalIncome - totalExpense;
      //render home page
      res.render('home', {
        records,
        totalExpense,
        totalIncome,
        balanceAmount,
        categories,
        months
      });
    })
    .catch((err) => console.log(err));
});

router.get('/filter', (req, res) => {
  let totalExpense = 0;
  let totalIncome = 0;
  let balanceAmount;
  if (!req.query.category && !req.query.month) {
    return res.redirect('/');
  }
  if (req.query.category && req.query.month) {
    Record.find({ category: req.query.category })
      .sort('_id')
      .lean()
      .then((records) => {
        const filteredRecords = records.filter((record) => {
          const recordMonth = new Date(record.date).getMonth() + 1;

          return recordMonth === Number(req.query.month);
        });
        filteredRecords.map(
          (record) => (totalExpense += record.isExpense && record.amount)
        );
        //map through all the income and add them together
        filteredRecords.map(
          (record) => (totalIncome += !record.isExpense && record.amount)
        );
        //balance
        balanceAmount = totalIncome - totalExpense;

        return res.render('home', {
          records: filteredRecords,
          totalExpense,
          totalIncome,
          balanceAmount,
          categories,
          months
        });
      })
      .catch((err) => console.log(err));
  }
  if (!req.query.month) {
    Record.find({ category: req.query.category })
      .sort('_id')
      .lean()
      .then((records) => {
        records.map(
          (record) => (totalExpense += record.isExpense && record.amount)
        );
        //map through all the income and add them together
        records.map(
          (record) => (totalIncome += !record.isExpense && record.amount)
        );
        //balance
        balanceAmount = totalIncome - totalExpense;
        return res.render('home', {
          records,
          totalExpense,
          totalIncome,
          balanceAmount,
          categories,
          months
        });
      })
      .catch((err) => console.log(err));
  }
  if (!req.query.category) {
    Record.find()
      .sort('_id')
      .lean()
      .then((records) => {
        const filteredRecords = records.filter((record) => {
          const recordMonth = new Date(record.date).getMonth() + 1;

          return recordMonth === Number(req.query.month);
        });
        filteredRecords.map(
          (record) => (totalExpense += record.isExpense && record.amount)
        );
        //map through all the income and add them together
        filteredRecords.map(
          (record) => (totalIncome += !record.isExpense && record.amount)
        );
        //balance
        balanceAmount = totalIncome - totalExpense;

        return res.render('home', {
          records: filteredRecords,
          totalExpense,
          totalIncome,
          balanceAmount,
          categories,
          months
        });
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
