import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import { User } from '../db/models';

/**
 * @description Authentication Controller
 * @class authController
 */
class authController {
  /**
   * @description Registration method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} User
   * @memberof authController
   */
  static async register(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password
      } = req.body;

      const isEmailExist = await User.findOne({
        where: {
          email
        }
      });

      if (isEmailExist) {
        return res.status(409).json({
          status: 409,
          message: 'Email already exist'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const isUser = await User.create({
        userId: uuidv4(),
        firstName,
        lastName,
        email,
        password: hash
      });

      const user = {};
      user.user = {};
      user.user.userId = isUser.userId;
      user.user.firstName = isUser.firstName;
      user.user.lastName = isUser.lastName;
      user.user.email = isUser.email;
      return res.status(201).json({
        status: 201,
        message: user
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Login method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} User
   * @memberof authController
   */
  static async login(req, res) {
    try {
      const {
        email,
        password
      } = req.body;

      const isEmailExist = await User.findOne({
        where: {
          email
        },
        raw: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });

      if (!isEmailExist) {
        return res.status(404).json({
          status: 404,
          message: 'Email does not exist'
        });
      }

      const comparePassword = bcrypt
        .compareSync(password, isEmailExist.password);

      if (!comparePassword) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid Password'
        });
      }

      const user = {};
      user.user = {};
      user.user.userId = isEmailExist.userId;
      user.user.firstName = isEmailExist.firstName;
      user.user.lastName = isEmailExist.lastName;
      user.user.email = isEmailExist.email;
      return res.status(200).json({
        status: 200,
        message: user
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default authController;
