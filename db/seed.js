const bcrypt = require('bcryptjs');
const { User, Job } = require('../models');
const user = require('./user.json');
const jobs = require('./jobs.json');

const seedDB = async () => {

    try {
        
        await User.deleteMany({});

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync( user.password, salt );

        user.password = hash;

        const createdUser = await User.create( user );

        const newJobs = jobs.map( job => {
            
            if ( job.user_id === null ) {
                job.user_id = createdUser._id
            }
            
            return job
        });

        await Job.deleteMany({})

        for ( let job of newJobs ) {
            const creaatedJob = await Job.create( job )

            createdUser.jobs.push(creaatedJob)
            await createdUser.save()
        }

        console.log( 'createdUser', createdUser );

        process.exit()

    } catch (error) {
        return console.log(error)
    }

};

seedDB();
