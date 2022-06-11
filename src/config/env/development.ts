export {};

require("dotenv").config();


const config = {
    mongodb: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/cleanwalk-api",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    jwt: {
        jwtSecret: 'jwtsecret2022',
        jwtExpire: (60 * 60 * 24) * 30,
    },
    port: 3001,
}

module.exports = config; 