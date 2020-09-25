const mongoose = require('mongoose');

require('dotenv').config();
const connectionStr = process.env.MONGODB_URI || "mongodb://localhost:27017/trackthatjob-dev";

mongoose.connect( connectionStr, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(function () {
    console.log("Mongodb connected....");
})
.catch(function (error) {
    console.log("Mongodb connection err", error);
});


mongoose.connection.on('disconneted', (error) => {
    console.log(error)
});

module.exports = {
    User: require('./User'),
    // Job: require('./Job'),
};
