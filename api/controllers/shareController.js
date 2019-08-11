import uuidv4 from 'uuid/v4';
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
        ideaId: uuidv4(),
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

  /**
   * @description Update Ideas
   * @param {object} req
   * @param {object} res
   * @returns {object} Idea
   * @memberof ShareController
   */
  static async updateIdea(req, res) {
    try {
      const { ideaId } = req.params;
      const { message } = req.body;

      await Share.update(
        {
          body: message
        },
        {
          where: {
            ideaId
          }
        }
      );

      return res.status(201).json({
        status: 201,
        data: 'Idea has been updated',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        data: err.message,
      });
    }
  }

  /**
   * @description Delete Ideas
   * @param {object} req
   * @param {object} res
   * @returns {object} Idea
   * @memberof ShareController
   */
  static async deleteIdea(req, res) {
    try {
      const { ideaId } = req.params;

      await Share.destroy(
        {
          where: {
            ideaId
          }
        }
      );

      return res.status(201).json({
        status: 201,
        data: 'Idea has been deleted',
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
