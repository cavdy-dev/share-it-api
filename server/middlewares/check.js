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
        return res.status(400).json({
          status: 400,
          message: 'Email already Exist'
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
}

export default Check;
