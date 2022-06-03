import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
const routes = require('./routes/index');
<<<<<<< HEAD
const cookieParser = require('cookie-parser')
const cookies = require('cookie-parser')
const session=require('cookie-parser')
=======
>>>>>>> 7106e847e77e625ed1272f31e7b0af112448dafb

const app = express();

app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
<<<<<<< HEAD
app.use(cookieParser())
app.use(cookies())
app.use(
    session({
        resave:false,
        saveUninitialiazed:false,
        secret:"seassionss",
        cookie:{
            maxAge: 1000*60*60,
            sameSite:"none",
            //httpOnly:flase,
            secure:true,
        }
    })
)
app.use('/', routes)
=======

app.use('/', routes);
>>>>>>> 7106e847e77e625ed1272f31e7b0af112448dafb

export default app;