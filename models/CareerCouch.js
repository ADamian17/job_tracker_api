const mongoonse = require('mongoose');

const careerCouchShema = new mongoonse.Schema({

    first_name: {
        type: String,
        required: [ true, 'First Name is require'],
    },
    last_name: {
        type: String,
        required: [ true, 'Last Name is require'],
    },
    email: {
        type: String,
        required: [ true, 'email is require'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    currentClass: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
    },
    users: [{
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
});

const CareerCouch = mongoonse.model( 'CareerCouch', careerCouchShema);

module.exports = CareerCouch;