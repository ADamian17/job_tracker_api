require('../config/db.connection');

module.exports = {
    User: require('./User'),
    Job: require('./Job'),
    CareerCouch: require('./CareerCouch')
    // Report: require('./Report'),
};
