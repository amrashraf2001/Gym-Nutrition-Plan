const {body} = require('express-validator');

const registerAuthentication = () => {
  return[
  body('userName').
  isLength({min: 3}).
  withMessage('Username must be at least 3 characters long'),
  body('email').
  trim().
  isEmail().
  withMessage('Please enter a valid email address'),
  body('password').
  trim().
  isLength({min: 8}).
  withMessage('Password must be at least 8 characters long'),
  body('gender').
  trim().
  notEmpty().
  withMessage('Please select gender')
  ];
};
module.exports = {registerAuthentication};