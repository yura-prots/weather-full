const mongoose = require('mongoose');

const { mongoURI } = require('../config');
mongoose.connect(mongoURI, {
   useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
   console.log('DB connected');
});
mongoose.connection.on('disconnected', () => {
   console.log('DB disconnected');
});
mongoose.connection.on('error', (err) => {
   console.log('Error:', err);
});
