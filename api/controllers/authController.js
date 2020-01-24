import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import { User } from '../db/models';
import jwt from '../middleware/jwt';

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
      const { firstName, lastName, email, password } = res.locals.user;

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

      const hashedPassword = bcrypt.hashSync(password, 12);

      await User.create({
        userId: uuidv4(),
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      const user = { userID, firstName, lastName, email };
      const token = await jwt.generateToken(user);

      return res.status(201).json({
        status: 201,
        message: {
          user,
          token
        }
      });
    } catch (error) {
      console.error(error);
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
      const { email, password } = res.locals.user;

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

      const comparePassword = bcrypt.compareSync(
        password,
        isEmailExist.password
      );

      if (!comparePassword) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid Password'
        });
      }

      const { userID, firstName, lastName } = isEmailExist;
      const user = { userID, firstName, lastName, email };

      const token = await jwt.generateToken(user);
      return res.status(201).json({
        status: 201,
        message: {
          user,
          token
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default authController;
