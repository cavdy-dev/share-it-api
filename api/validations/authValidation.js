import validator from 'validator';

/**
 * @description Authentication Validation
 * @class authValidation
 */
class authValidation {
  /**
   * @description Signup Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof authValidation
   */
  static signupValidation(req, res, next) {
    let {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    const spaces = /\s/g;
    const errors = {};

    // Remove white spaces
    firstName = firstName.replace(spaces, '');
    lastName = lastName.replace(spaces, '');
    email = email.replace(spaces, '');
    password = password.replace(spaces, '');

    if (!validator.isLength(firstName, { min: 5, max: 10 })) {
      errors.firstName = 'First Name should be between 5 and 10 characters';
    }

    if (!validator.isAlpha(firstName)) {
      errors.firstName = 'First Name should be an alphabet';
    }

    if (!validator.isLength(lastName, { min: 5, max: 10 })) {
      errors.lastName = 'Last Name should be between 5 and 10 characters';
    }

    if (!validator.isAlpha(lastName)) {
      errors.lastName = 'Last Name should be an alphabet';
    }

    if (!validator.isEmail(email)) {
      errors.email = 'Please put in a valid email';
    }
    if (!validator.isLength(password, { min: 5, max: 10 })) {
      errors.password = 'Password should be between 5 and 10 characters';
    }

    // Check if error
    if (Object.keys(errors).length === 0) {
      const user = {};
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;

      res.locals.user = user;
      return next();
    }

    return res.status(422).json({
      status: 422,
      data: errors
    });
  }

  /**
   * @description Login Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof authValidation
   */
  static loginValidation(req, res, next) {
    let {
      email,
      password
    } = req.body;
    const spaces = /\s/g;
    const errors = {};

    // Remove white spaces
    email = email.replace(spaces, '');
    password = password.replace(spaces, '');

    if (!validator.isEmail(email)) {
      errors.email = 'Please put in a valid email';
    }
    if (!validator.isLength(password, { min: 5, max: 10 })) {
      errors.password = 'Password should be between 5 and 10 characters';
    }

    // Check if error
    if (Object.keys(errors).length === 0) {
      const user = {};
      user.email = email;
      user.password = password;
      res.locals.user = user;
      return next();
    }

    return res.status(422).json({
      status: 422,
      data: errors
    });
  }
}

export default authValidation;
