require('dotenv').config();
import express from 'express';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';


let app = express();


app.use(cookieParser(
    'iMsoVC'
));
app.use(session({
    secret: 'iMsoVC',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 70000
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


viewEngine(app);


app.use(passport.initialize());
app.use(passport.session());

initWebRoutes(app);

let port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening to port 8000');
});