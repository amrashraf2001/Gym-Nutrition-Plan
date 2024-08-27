const {body} = require('express-validator');

const signupAuthenticate = [
  body('userName').
  isLength({min: 3}).
  withMessage('Username must be at least 3 characters long'),
  body('email').
  isEmail().
  withMessage('Please enter a valid email address'),
  body('password').
  isLength({min: 8}).
  withMessage('Password must be at least 8 characters long'),
  body('gender').
  notEmpty().
  withMessage('Please select gender')
];
module.exports = signupAuthenticate;