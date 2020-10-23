// const Sequelize = require('sequelize');
// const db = require('../config/db.connection');

// const Report = db.define(
//     'Report',
//     {
//        report_id: {
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true,
//         },
//         applied: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         rejected: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         goal: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         user_id_fk: {
//             type: Sequelize.INTEGER(),
//         },
//     },
//     {
//         timestamps: true,
//     }
// );


// Report.associte = ( models ) => {
//     Report.belongsTo(models.User, {
//         onDelete: 'CASCADE',
//     });
// };
  
// module.exports = Report;
