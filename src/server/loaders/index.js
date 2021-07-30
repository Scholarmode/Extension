const expressLoader = require('./express')
const passportLoader = require('./passport')

module.exports = async (expressApp) => {
    await passportLoader(expressApp)
    console.log('Passport Initialised')

    await expressLoader(expressApp)
    console.log('Express Initialised')
}
