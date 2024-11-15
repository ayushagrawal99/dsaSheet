const mongoose = require('mongoose');

const dbConnect = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dsasheet.9frcc.mongodb.net/dsaSheet`);
}

module.exports = dbConnect;