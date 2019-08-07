import jwt from 'jsonwebtoken';

/**
 * @description JWT
 * @class JWT
 */
class JWT {
  /**
   * @description Check for token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Error / Response
   * @memberof JWT
   */
  static checkToken(req, res, next) {
    const token = req.headers.authorization;
    if (token === undefined) {
      return res.status(403).json({
        status: 403,
        data: 'No token found'
      });
    }

    req.token = token;
    return next();
  }

  /**
   * @description Generate token
   * @param {object} payload
   * @returns {object} Error / Response
   * @memberof JWT
   */
  static generateToken(payload) {
    return jwt.sign(payload, '5050', { expiresIn: '24h' });
  }

  /**
   * @description Verify token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Error / Response
   * @memberof JWT
   */
  static verifyToken(req, res, next) {
    jwt.verify(req.token, '5050', (err, authorize) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          data: 'Invalid token'
        });
      }

      req.authorize = authorize;
      return next();
    });
  }
}

export default JWT;
