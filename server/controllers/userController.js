import uuid from 'uuid/v4';
import { User } from '../../db/models';
import hashPassword from '../helpers/hashPassword';

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
        user: { email, password }
      } = res.locals;

      const hash = hashPassword(password);
      await User.create({ userId: uuid(), email, password: hash });
      res.status(201).json({
        status: 201,
        message: 'Successfully signed up'
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
