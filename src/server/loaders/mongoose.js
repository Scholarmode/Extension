const mongoose = require('mongoose')

module.exports = async (expressApp) => {
    const atlasUser = process.env.ATLAS_USER
    const atlasPwrd = process.env.ATLAS_PWRD

    const uri = `mongodb+srv://${atlasUser}:${atlasPwrd}@realmcluster.fi10q.mongodb.net/ScholarMode?retryWrites=true&w=majority`

    mongoose.connect(
        uri,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        },
        function (err) {
            if (err) {
                return console.log('Mongoose - connection error:', err)
            }
            console.log('Connected to Mongoose successfully')
        }
    )
}
