const passportLoader = require('./passport')

module.exports = async (expressApp) => {
    await passportLoader(expressApp)
    console.log('Passport Initialised')
}
