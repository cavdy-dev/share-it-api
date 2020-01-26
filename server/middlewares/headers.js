import jwt from 'jsonwebtoken';
import { jwtToken, clientKey } from '../../db/config/config';

/**
 * @description Headers Request
 * @class Headers
 */
class Headers {
  /**
   * @description Generates Token
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {string} token
   */
  static async generateToken(req, res, next) {
    try {
      const { user } = res.locals;
      const { email } = user;
      const token = await jwt.sign({ email }, jwtToken, { expiresIn: '24h' });
      res.locals.token = token;
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
   * @description Client Key
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {string} key
   */
  static clientKey(req, res, next) {
    const { clientkey } = req.headers;
    if (clientkey && clientkey === clientKey) {
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: 'please add a client key'
      });
    }
  }
}

export default Headers;
