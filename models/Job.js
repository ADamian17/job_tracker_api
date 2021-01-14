const mongoonse = require('mongoose');

const jobSchema = new mongoonse.Schema({
    job_position: {
        type: String,
        required: [ true, 'Job Position is required']
    },
    job_post_url: {
        type: String,
        required: [ true, 'Job Post Url is required']
    },
    company_name: {
        type: String,
        required: [ true, 'Company Name is required']
    },
    point_of_contact: {
        type: String,
        required: [ true, 'Company Name is required']
    },
    job_status: {
        type: String,
        default: 'applied'
    },
    on_site: {
        type: String,
        default: 'no'
    },
    phone_screen: {
        type: String,
        default: 'no'
    },
    applied_date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true,
});   

const Job = mongoonse.model( 'Job', jobSchema );

module.exports = Job;
