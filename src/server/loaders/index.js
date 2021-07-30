const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')
const passportLoader = require('./passport')

module.exports = async (expressApp) => {
    await mongooseLoader(expressApp)

    await passportLoader(expressApp)
    console.log('Passport Initialised')

    await expressLoader(expressApp)
    console.log('Express Initialised')
}
