const mongoose = require('mongoose');
import config from '../config/config'

const dbConnection = async () => {
  try {
    return await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   user: config.MONGO_USER,
    //   pass: config.MONGO_PASSWORD
    })
      .then((dbCon) => {
        console.log('DB Online');
      })
      .catch((err) => {
        console.error('Error connecting to mongo', err);
      });
  } catch (error) {
    throw new Error('Error a la hora de inicializad DB');
  }
};

export default dbConnection;
