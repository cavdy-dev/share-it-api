import { Share } from '../db/models';

/**
 * @description Validating
 * @class Validate
 */
export default class Validate {
  /**
   * @description Check if Idea Exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Idea
   * @memberof ShareController
   */
  static async checkifIdeaExist(req, res, next) {
    const { ideaId } = req.params;

    const ideaExist = await Share.findOne({
      where: {
        ideaId
      },
      attributes: ['ideaId', 'userId']
    });

    if (!ideaExist) {
      return res.status(404).json({
        status: 404,
        data: 'Idea does not exist',
      });
    }

    res.locals.idea = ideaExist;
    return next();
  }

  /**
   * @description Check if user
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Idea
   * @memberof ShareController
   */
  static async checkifUser(req, res, next) {
    const { idea } = res.locals;
    const { user } = req.authorize;
    const { userId } = user;

    if (userId !== idea.userId) {
      return res.status(403).json({
        status: 403,
        data: 'You don\'t have permission to do this',
      });
    }

    return next();
  }
}
