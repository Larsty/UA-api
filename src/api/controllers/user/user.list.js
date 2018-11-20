const isAdmin = require('../../middlewares/isAdmin')
const errorHandler = require('../../utils/errorHandler')
const isAuth = require('../../middlewares/isAuth')

/**
 * GET /users
 *
 * Response:
 * [
 *    {
 *      id, name, firstname, lastname, email, paid, teamId, material, permissions
 *    },
 *    ...
 * ]
 */
module.exports = app => {
  app.get('/users', [isAuth(), isAdmin()])

  app.get('/users', async (req, res) => {
    const { User, Team, Order, Permission } = req.app.locals.models

    try {
      const users = await User.findAll({
        include: [Team, Order, Permission]
      })

      let usersData = users.map(user => {
        // Get orders
        let orders = user.orders.map(order => {
          return {
            paid: order.paid,
            paid_at: order.paid_at,
            transactionState: order.transactionState,
            place: order.place,
            plusone: order.plusone,
            material: {
              ethernet: order.ethernet,
              ethernet7: order.ethernet7,
              kaliento: order.kaliento,
              mouse: order.mouse,
              keyboard: order.keyboard,
              headset: order.headset,
              screen24: order.screen14,
              screen27: order.screen27,
              chair: order.chair,
              gamingPC: order.gamingPC,
              streamingPC: order.streamingPC,
              laptop: order.laptop,
              tombola: order.tombola,
              shirt: order.shirt
            }
          }
        })

        // Get permissions
        let permissions = null
        if(user.permission) {
          permissions = {
            respo: user.permission.respo,
            admin: user.permission.admin
          }
        }

        return {
          id: user.id,
          name: user.name,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          paid: user.paid,
          teamId: user.team ? user.team.id : '/',
          permissions,
          spotlightId: user.team ? user.team.spotlightId : '/',
          orders
        }
      })

      return res
        .status(200)
        .json(usersData)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
