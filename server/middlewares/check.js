import { User } from '../../db/models';

/**
 * @description Check if Exist
 * @class Check
 */
class Check {
  /**
   * @description Create User
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @return {object} user
   */
  static async checkIfEmailExist(req, res, next) {
    try {
      const {
        user: { email }
      } = res.locals;

      const emailExist = await User.findOne({ where: { email } });
      if (emailExist && Object.keys(emailExist).length !== 0) {
        const error = {
          email: 'Email already Exist'
        };
        return res.status(400).json({
          status: 400,
          message: 'Email already Exist',
          data: error
        });
      }
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: 500,
        message: 'Something went wrong'
      });
    }
  }

  /**
   * @description Create User
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @return {object} user
   */
  static async checkIfEmailDontExist(req, res, next) {
    try {
      const {
        user: { email }
      } = res.locals;

      const emailExist = (await User.findOne({ where: { email } })) || {};
      if (emailExist && Object.keys(emailExist).length === 0) {
        const error = {
          email: 'Email Does Not Exist'
        };
        return res.status(404).json({
          status: 404,
          message: 'Email Does Not Exist',
          data: error
        });
      }

      res.locals.userData = emailExist;
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: 500,
        message: 'Something went wrong'
      });
    }
  }
}

export default Check;
