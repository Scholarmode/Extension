import passportLoader from './passport'

const loaders = async (expressApp) => {
    await passportLoader(expressApp)
    console.log('Passport Initialised')
}

export default loaders
