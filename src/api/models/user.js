const env = require('../../env')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, unique: true },
    lastname: { type: DataTypes.STRING },
    firstname: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, validate: { isEmail: true }, unique: true },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: { type: DataTypes.STRING },
    barcode: { type: DataTypes.STRING },
    paid: { type: DataTypes.BOOLEAN, defaultValue: false },
    paid_at: { type: DataTypes.STRING, defaultValue: null },
    shirt: { type: DataTypes.ENUM(env.ARENA_SHIRT_SIZES.split(',')), defaultValue: 'none' },
    plusone: { type: DataTypes.BOOLEAN, defaultValue: false },
    ethernet: { type: DataTypes.BOOLEAN, defaultValue: false },
    kaliento: { type: DataTypes.BOOLEAN, defaultValue: false },
    mouse: { type: DataTypes.BOOLEAN, defaultValue: false },
    keyboard: { type: DataTypes.BOOLEAN, defaultValue: false },
    headset: { type: DataTypes.BOOLEAN, defaultValue: false },
    screen24: { type: DataTypes.BOOLEAN, defaultValue: false },
    screen27: { type: DataTypes.BOOLEAN, defaultValue: false },
    chair: { type: DataTypes.BOOLEAN, defaultValue: false },
    gamingPC: { type: DataTypes.BOOLEAN, defaultValue: false },
    streamingPC: { type: DataTypes.BOOLEAN, defaultValue: false },
    laptop: { type: DataTypes.BOOLEAN, defaultValue: false },
    tombola: { type: DataTypes.INTEGER, defaultValue: 0 },
    transactionId: { type: DataTypes.INTEGER, defaultValue: 0 },
    transactionState: { type: DataTypes.STRING },
    registerToken: { type: DataTypes.STRING },
    resetToken: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    respo: { type: DataTypes.INTEGER, defaultValue: 0 },
  })
}
