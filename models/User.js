const mongoonse = require('mongoose');

const userShema = new mongoonse.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First Name is require'],
    },
    last_name: {
      type: String,
      required: [true, 'Last Name is require'],
    },
    email: {
      type: String,
      required: [true, 'email is require'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    profession: {
      type: String,
      required: [true, 'Profession is required'],
    },
    role: {
      type: String,
      default: 'user',
    },
    profile_image: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/track-that-job.appspot.com/o/avatar-3814049_1280.png?alt=media&token=125bfa4e-f01b-4d42-a60d-1554eb60cd6f',
    },
    jobs: [
      {
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
    reports: [
      {
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'Report',
      },
    ],
    career_coach: [
      {
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'Couch',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userShema.set('toJSON', {
  transform: (doc, ret, opt) => {
    delete ret['password'];
    return ret;
  },
});

const User = mongoonse.model('User', userShema);

module.exports = User;
