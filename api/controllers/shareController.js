import { Share } from '../db/models';

/**
 * @description Share Controller
 * @class ShareController
 */
class ShareController {

  /**
   * @description Create Ideas
   * @param {object} req
   * @param {object} res
   * @returns {object} Idea
   * @memberof ShareController
   */
  static async createIdea(req, res) {
    try {
      const { message } = req.body;
      const { user } = req.authorize;
      const { userId } = user;

      const idea = await Share.create({
        userId,
        body: message
      });

      return res.status(201).json({
        status: 201,
        data: idea,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        data: err.message,
      });
    }
  }
}

export default ShareController;
