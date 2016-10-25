'use strict';

let express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  // authorize = require('./routes/authorize'),
  mongoose = require('mongoose'),
  Student = require('./models/Student'),
  config = require('config'),
  passport = require('passport'),
  expressSession = require('express-session');

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));


// Mongoose (mongoDB) connection
const DB_URL = (process.env.DB_URL) ?
  (process.env.DB_URL) :
  config.get('dbURL');

mongoose.connect(DB_URL);

// Passport initialization
app.use(expressSession({secret: 'secretssecretsarenofun', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
let initPassport = require('./passport/init');
initPassport(passport);

// Route will look like {URL:PORT}/api/v1/{route}
let courses = require('./routes/courses')(passport);
let auth = require('./routes/auth')(passport);

let apiRouter = express.Router();
app.use('/api', apiRouter);
let apiV1 = express.Router();
apiRouter.use('/v1', apiV1);

// Attach v1 routes to apiV1
apiV1.use('/courses', courses);
// apiV1.use('/authorize', authorize);
apiV1.use('/auth', auth);

let server = app.listen(process.env.PORT || 5050, function () {
    let host = server.address().address;
    host = (host === '::' ? 'localhost' : host);
    let port = server.address().port;
    console.log(`listening at http://${host}:${port}`);
});

