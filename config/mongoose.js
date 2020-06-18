const mongoose = require('mongoose');
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => console.error('connection error!'));
db.once('open', () => console.log('mongodb connected!'));

module.exports = db;