const errorHandler = require('../../utils/errorHandler');
const querySearch = require('../../utils/querySearch');
const { includePay, includeCart } = require('../../utils/customIncludes');

/**
 * Get a user based on its id
 *
 * GET /entry/user
 * {
 *
 * }
 *
 * Response
 * {
 *   User
 * }
 *
 * @param {object} userModel
 * @param {object} teamModel
 * @param {object} tournamentModel
 */
const Search = (userModel, teamModel, tournamentModel, cartItemModel, cartModel, itemModel, attributeModel) => async (request, response) => {
  try {
    const { search } = request.query;
    let users = await userModel.findAll({
      attributes: [
        'id',
        'email',
        'username',
        'firstname',
        'lastname',
        'place',
        'permissions',
        'type',
        'scanned',
      ],
      where: querySearch(search),
      include: [
        {
          model: teamModel,
          attributes: ['id', 'name'],
          include: {
            model: tournamentModel,
            attributes: ['shortName'],
          },
        },
        includePay(cartItemModel, cartModel, userModel),
        includeCart(cartModel, cartItemModel, itemModel, userModel, attributeModel),
      ],
    });

    users = users.map((user) => ({
      ...user.toJSON(),
      isPaid: user.forUser.length,
    }));

    if (users.length !== 1) {
      return response
        .status(404)
        .json({ error: 'USER_NOT_FOUND' })
        .end();
    }

    const user = users[0];

    return response
      .status(200)
      .json(user)
      .end();
  }
  catch (error) {
    return errorHandler(error, response);
  }
};

module.exports = Search;
