const mongoose = require('mongoose');

process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/ecommerce';

const connectDatabase = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI).then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
  } catch (error) {
    console.log('Database connection error');
  }
};

module.exports = connectDatabase;
