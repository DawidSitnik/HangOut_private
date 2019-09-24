import mongoose from 'mongoose';

export default () => { // teraz jesli zaimportujemy db.js to jako domyslna wykona się ta funkcja
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/HangOut', {  useCreateIndex: true, useNewUrlParser: true });
  mongoose.connection
    .once('open', () => console.log('MongoDB is running'))
    .on('error', err => console.error(err));
  mongoose.set('useFindAndModify', false);
};
