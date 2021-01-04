const mongoose = require('mongoose');

require('dotenv').config();
// const connectionStr = "mongodb://localhost:27017/trackthatjob-dev";
const connectionStr = process.env.MONGODB_URI || "mongodb://localhost:27017/trackthatjob-dev";

mongoose.connect( connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
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
    Job: require('./Job'),
    // Report: require('./Report'),
    CareerCouch: require('./CareerCouch')
};
