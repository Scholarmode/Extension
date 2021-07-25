import passportLoader from './passport'

const loaders = async ({ expressApp }) => {
    await passportLoader({ app: expressApp })
    console.log('Passport Initialised')
}

export default loaders
