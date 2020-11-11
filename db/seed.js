const bcrypt = require('bcryptjs');
const { User, Job } = require('../models');
const user = require('./user.json');
const jobs = require('./jobs.json');

const seedDB = async () => {

    try {
        
        await User.deleteMany({});

        let password = user.password;
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync( password, salt );
        password = hash;

        const newUser = {
            first_name: user.first_name, 
            last_name: user.last_name, 
            email: user.email,
            password: password, 
            profession: user.profession
        }

        const createdUser = await User.create( newUser );

        const newJobs = jobs.map( job => {
            
            if ( job.user_id === null ) {
                job.user_id = createdUser._id
            }
            
            return job
        });

        await Job.deleteMany({})

        for (let job of newJobs ) {
        const creaatedJob = await Job.create( job )

        createdUser.jobs.push(creaatedJob)
        await createdUser.save()
        }

        console.log( 'createdUser', createdUser );

        process.exit()

    } catch (error) {
        return console.log(error)
        process.exit()
    }

};

seedDB();