const ExpressValidator = require('express-validator').ExpressValidator;

const { body } = new ExpressValidator(
  {
    confirmPassword: (value, {req}) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    },
    compareOldPasswords: (value, {req}) => {
      if (value !== req.body.oldPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    },
  },
);


const checkUserName = () => {
  return body('userName').
  trim().
  isLength({min: 3}).
  withMessage('Username must be at least 3 characters long')
};

const checkEmail = () => {
  return body('email').
  trim().
  isEmail().
  withMessage('Please enter a valid email address')
};

const checkPassword = () => {
  return body('password').
  trim().
  isLength({min: 8}).
  withMessage('Password must be at least 8 characters long')
}

const checkGender = () => {
  return body('gender').
  trim().
  notEmpty().
  withMessage('Please select gender')
}


module.exports = {checkUserName, checkEmail, checkPassword, checkGender};
// module.exports = {registerAuthentication};