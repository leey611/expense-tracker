if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const bcrypt = require('bcryptjs');
const db = require('../../config/mongoose');
const Record = require('../record');
const User = require('../user');
const seedJson = require('./record.json').users;

db.once('open', () => {
  const promises = [createSeed(seedJson, 0), createSeed(seedJson, 1)];
  Promise.all(promises).then(() => {
    console.log('seed created');
    db.close();
  });

  console.log('seed created!');
});

const createSeed = (userInfo, index) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(userInfo[index].password, salt))
      .then((hash) =>
        User.create({
          name: userInfo[index].name,
          email: userInfo[index].email,
          password: hash
        }).catch((err) => console.log(err))
      )
      .then((createdUser) => {
        const userId = createdUser._id;
        resolve(
          Promise.all(
            Array.from(seedJson[index].records, (record) => {
              return Record.create({
                name: record.name,
                isExpense: record.isExpense,
                merchant: record.merchant,
                category: record.category,
                date: record.date,
                amount: record.amount,
                userId
              });
            })
          ).catch((err) => console.log(err))
        );
      });
  });
};
