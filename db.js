const mongoose = require("mongoose");

const mongourl = 'mongodb+srv://root:todoba123@cluster0.xcho85v.mongodb.net/mern-rooms';

mongoose.connect(mongourl, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on('error', () => {
    console.log('Mongo DB Connection failed');
});

connection.on('connected', () => {
    console.log('Mongo DB Connection successful');
});

module.exports = mongoose;
