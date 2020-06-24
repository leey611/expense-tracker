const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const allCategories = [
  'Home',
  'Transport',
  'Entertainment',
  'Food',
  'Others',
  'Salary',
  'Gift'
];
const categories = ['Home', 'Transport', 'Entertainment', 'Food', 'Others'];
const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

router.get('/', (req, res) => {
  const userId = req.user._id;
  const totalExpense = Record.aggregate([
    {
      $match: {
        userId: userId,
        isExpense: true
      }
    },
    {
      $group: {
        _id: null,
        amount: { $sum: '$amount' }
      }
    }
  ]).exec();
  const totalIncome = Record.aggregate([
    {
      $match: {
        userId: userId,
        isExpense: false
      }
    },
    {
      $group: {
        _id: null,
        amount: { $sum: '$amount' }
      }
    }
  ]).exec();

  const records = Record.aggregate([
    {
      $match: {
        userId: userId
      }
    }
  ]).exec();

  Promise.all([totalExpense, totalIncome, records])
    .then(([totalExpense, totalIncome, records]) => {
      const balanceAmount = totalIncome[0].amount - totalExpense[0].amount;

      return res.render('home', {
        records,
        totalExpense: totalExpense[0].amount,
        totalIncome: totalIncome[0].amount,
        balanceAmount,
        months,
        categories: allCategories
      });
    })
    .catch((error) => console.error(error));
});

// Filter the records according to categories or months
router.get('/filter', (req, res) => {
  const userId = req.user._id;
  let totalExpense = 0;
  let totalIncome = 0;
  let balanceAmount;
  // if either category or months isn't selected, redirect to home
  if (!req.query.category && !req.query.month) {
    return res.redirect('/');
  }
  // if both category and months are selected, find by the category and then filter by the month
  if (req.query.category && req.query.month) {
    Record.find({ category: req.query.category, userId })
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

  //if only category is selected (no months), find by the category
  if (!req.query.month) {
    Record.find({ category: req.query.category, userId })
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

  // if only months is selected, find all first and then filter with the month
  if (!req.query.category) {
    Record.find({ userId })
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

//dashboard
router.get('/dashboard', (req, res) => {
  //console.log(req.user);
  let homeEx = 0;
  let transportEx = 0;
  let entertainEx = 0;
  let foodEx = 0;
  let othersEx = 0;
  let jan = 0;
  let feb = 0;
  let mar = 0;
  let apr = 0;
  let may = 0;
  let jun = 0;
  let jul = 0;
  let aug = 0;
  let sep = 0;
  let oct = 0;
  let nov = 0;
  let dec = 0;

  const userId = req.user._id;
  Record.find({ userId, isExpense: true })
    .lean()
    .then((records) => {
      records.map((record) => {
        //for categories
        homeEx +=
          record.isExpense && record.category === 'Home' && record.amount;
        transportEx +=
          record.isExpense && record.category === 'Transport' && record.amount;
        entertainEx +=
          record.isExpense &&
          record.category === 'Entertainment' &&
          record.amount;
        foodEx +=
          record.isExpense && record.category === 'Food' && record.amount;
        othersEx +=
          record.isExpense && record.category === 'Others' && record.amount;
        //for monthly
        //check if the record is in current year
        if (new Date(record.date).getFullYear() === new Date().getFullYear()) {
          //console.log(new Date(record.date).getMonth() + 1 === 6);
          jan += new Date(record.date).getMonth() + 1 === 1 && record.amount;
          feb += new Date(record.date).getMonth() + 1 === 2 && record.amount;
          mar += new Date(record.date).getMonth() + 1 === 3 && record.amount;
          apr += new Date(record.date).getMonth() + 1 === 4 && record.amount;
          may += new Date(record.date).getMonth() + 1 === 5 && record.amount;
          jun += new Date(record.date).getMonth() + 1 === 6 && record.amount;
          jul += new Date(record.date).getMonth() + 1 === 7 && record.amount;
          aug += new Date(record.date).getMonth() + 1 === 8 && record.amount;
          sep += new Date(record.date).getMonth() + 1 === 9 && record.amount;
          oct += new Date(record.date).getMonth() + 1 === 10 && record.amount;
          nov += new Date(record.date).getMonth() + 1 === 11 && record.amount;
          jan += new Date(record.date).getMonth() + 1 === 12 && record.amount;
        }
      });

      res.render('dashboard', {
        homeEx,
        transportEx,
        entertainEx,
        foodEx,
        othersEx,
        jan,
        feb,
        mar,
        apr,
        may,
        jun,
        jul,
        aug,
        sep,
        oct,
        nov,
        dec
      });
    });
});

module.exports = router;
