import uuid from 'uuid/v4';
import { User } from '../../db/models';
import { hashPassword, comparePassword } from '../helpers/hashPassword';

/**
 * @description User Controller
 * @class UserController
 */
class UserController {
  /**
   * @description Create User
   * @param {object} req
   * @param {object} res
   * @return {object} user
   */
  static async createUser(req, res) {
    try {
      const {
        user: { email, password },
        token
      } = res.locals;

      const hash = hashPassword(password);
      await User.create({ userId: uuid(), email, password: hash });
      res.status(201).json({
        status: 201,
        message: 'Successfully signed up',
        token
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: 500,
        message: 'Something went wrong'
      });
    }
  }

  /**
   * @description Login User
   * @param {object} req
   * @param {object} res
   * @return {object} user
   */
  static async loginUser(req, res) {
    try {
      const {
        user: { password },
        token,
        userData
      } = res.locals;
      const {
        dataValues: { password: dbPassword }
      } = userData;

      const isPassword = await comparePassword(password, dbPassword);

      if (!isPassword) {
        const error = {
          password: 'incorrect password'
        };
        return res.status(400).json({
          status: 400,
          message: 'Incorrect data',
          data: error
        });
      }

      res.status(200).json({
        status: 200,
        message: 'Successfully logged in',
        token
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: 500,
        message: 'Something went wrong'
      });
    }
  }
}

export default UserController;
