const mongoose = require('mongoose');
import config from '../config/config'

const dbConnection = async () => {
  console.log('acá')
  mongoose.connect(3001, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('DB Online');
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err);
    });
};

export default dbConnection;
