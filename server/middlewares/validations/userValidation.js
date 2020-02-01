/* eslint-disable require-jsdoc */
import Validator from 'validator';

class Validation {
  static userSignupValidation(req, res, next) {
    const whitespaces = /\s/g;
    const usernameReg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    const error = {};
    let { username, email, password } = req.body;
    username = (username && username.replace(whitespaces, '')) || '';
    email = (email && email.replace(whitespaces, '')) || '';
    password = (password && password.replace(whitespaces, '')) || '';

    if (!usernameReg.test(username)) {
      error.username =
        'Username can only contain these special characters (_.)';
    }

    if (!Validator.isEmail(email)) {
      error.email = 'Invalid email address';
    }

    if (!Validator.isLength(password, { min: 8 })) {
      error.password = 'Password must be 8 characters long';
    }

    if (Object.keys(error).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Incorrect data',
        data: error
      });
    }

    res.locals.user = { username, email, password };
    next();
  }

  static userLoginValidation(req, res, next) {
    const whitespaces = /\s/g;
    const usernameReg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    const error = {};
    let { data, password } = req.body;
    data = (data && data.replace(whitespaces, '')) || '';
    password = (password && password.replace(whitespaces, '')) || '';
    let type = '';

    if (usernameReg.test(data)) {
      type = 'username';
    } else if (Validator.isEmail(data)) {
      type = 'email';
    } else {
      error.data = 'incorrect data';
    }

    if (!Validator.isLength(password, { min: 8 })) {
      error.password = 'Password must be 8 characters long';
    }

    if (Object.keys(error).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Incorrect data',
        data: error
      });
    }

    res.locals.user = { data, type, password };
    next();
  }
}

export default Validation;
