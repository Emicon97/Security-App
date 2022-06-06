const mongoose = require('mongoose');
import config from '../config/config'

const dbConnection = async () => {
  return await mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_CONFIG}` || 3001, {
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
