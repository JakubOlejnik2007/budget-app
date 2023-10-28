const dotenv = require('dotenv');

dotenv.config();

const { EXPRESS_PORT, MONGO_DB_IP, MONGO_DB_PORT, MONGO_DB_NAME, MAIL_SERVICE, MAIL_USER, MAIL_PASS, VAPID_PUBLIC, VAPID_PRIVATE, JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

const config = {
    express: {
        port: Number(EXPRESS_PORT),
    },
    MongoDB: {
        host: String(MONGO_DB_IP),
        port: Number(MONGO_DB_PORT),
        name: String(MONGO_DB_NAME),
    },
    mail: {
        service: String(MAIL_SERVICE),
        user: String(MAIL_USER),
        pass: String(MAIL_PASS),
    },
    vapid: {
        public: String(VAPID_PUBLIC),
        private: String(VAPID_PRIVATE)
    },
    authentication: {
        secret: String(JWT_SECRET_KEY),
        expiresIn: String(JWT_EXPIRES_IN)
    }
};
module.exports = config;