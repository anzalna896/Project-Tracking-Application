require('./users');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://AnzalnaNazar:9061596064@backend.dvzza.gcp.mongodb.net/Projects?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
