const mongoose = require('mongoose');
const MONGO_URI =  process.env.MONGO_URI;

const connect = async function () {
    try {
        await mongoose.connect(MONGO_URI, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const disconnect = function () {
    mongoose.connection.close().then(() => {
        console.log('Connection to MongoDB successfully closed');
    }).catch(error => {
        console.error('Error closing connection to MongoDB:', error);
    });
};

const getConn = function () {
    return mongoose.connection;
};

module.exports = {
    connect,
    disconnect,
    getConn,
};