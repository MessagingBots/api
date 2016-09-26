'use strict';

let axios = require('axios');
let express = require('express');
let router = express.Router();

let canvasAuthMiddleWare = function(req, res, next) {
  // Expects Canvas Auth Token in req.headers.authorization
  if (!req.headers.authorization) {
    res.send({'error': 'Error: Canvas authorization token required.'});
  } else {
    next();
  }
};

/* GET /courses */
router.get('/', canvasAuthMiddleWare, function(req, res, next) {
  let authToken = req.headers.authorization;
  // let authToken = '1016~JzBQPzwPJzB58iOAADG5hP8hxdF2L20xSt70uE1KatDRwMiOxxyVwFXeHDwfD0nq';

  // @TODO Remove this to config as well, this is hardcoded for Fall 2016
  let currTerm = 1890;
  let courses = [];
  axios.get(`https://ufl.instructure.com/api/v1/courses?access_token=${authToken}`)
    // Successful GET of courses
    // Iterate through each course, check if it is in the current term
    .then(function(response) {
      response.data.forEach((course) => {
        if (course.enrollment_term_id === currTerm)
          courses.push(course);
      });

      // Return the student's courses
      res.send({'courses': courses});
    })
    .catch(function(err) {
      // Handle an error
      console.log('Error!');
      let status = err.response.status;
      let statusText = err.response.statusText;
      res.send({
        'error': status,
        'statusText': statusText,
      });
    });
});

/* GET /courses/id */
router.get('/:id', canvasAuthMiddleWare, function(req, res, next) {
  let authToken = req.headers.authorization;
  // let authToken = '1016~JzBQPzwPJzB58iOAADG5hP8hxdF2L20xSt70uE1KatDRwMiOxxyVwFXeHDwfD0nq';

  // @TODO Remove this to config as well, this is hardcoded for Fall 2016
  let currTerm = 1890;
  let courses = [];
  axios.get(`https://ufl.instructure.com/api/v1/courses?access_token=${authToken}`)
    // Successful GET of courses
    // Iterate through each course, check if it is in the current term
    .then(function(response) {
      response.data.forEach((course) => {
        if (course.enrollment_term_id === currTerm)
          courses.push(course);
      });

      // Return the student's courses
      res.send({'courses': courses});
    })
    .catch(function(err) {
      // Handle an error
      console.log('Error!');
      let status = err.response.status;
      let statusText = err.response.statusText;
      res.send({
        'error': status,
        'statusText': statusText,
      });
    });
});

module.exports = router;