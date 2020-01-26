import Validator from 'validator';

const userValidation = (req, res, next) => {
  const whitespaces = /\s/g;
  const error = {};
  let { email, password } = req.body;
  email = email && email.replace(whitespaces, '');
  password = password && password.replace(whitespaces, '');

  if (!Validator.isEmail(email)) {
    error.email = 'Invalid email address';
  }

  if (!Validator.isLength(password, { min: 8 })) {
    error.password = 'Password must 8 characters long';
  }

  if (Object.keys(error).length !== 0) {
    return res.status(400).json({
      status: 400,
      message: 'Incorrect data',
      data: error
    });
  }

  res.locals.user = { email, password };
  next();
};

export default userValidation;
