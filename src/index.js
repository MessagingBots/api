'use strict';

let express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  courses = require('./routes/courses');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Route will look like {URL:PORT}/api/v1/{route}
let apiRouter = express.Router();
app.use('/api', apiRouter);
let apiV1 = express.Router();
apiRouter.use('/v1', apiV1);

// Attach v1 routes to apiV1
apiV1.use('/courses', courses);

let server = app.listen(process.env.PORT || 5000, function () {
    let host = server.address().address;
    host = (host === '::' ? 'localhost' : host);
    let port = server.address().port;
    console.log(`listening at http://${host}:${port}`);
});

