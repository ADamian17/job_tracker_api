const mongoonse = require("mongoose");

const userShema = new mongoonse.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First Name is require"],
    },
    last_name: {
      type: String,
      required: [true, "Last Name is require"],
    },
    email: {
      type: String,
      required: [true, "email is require"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profession: {
      type: String,
      required: [true, "Profession is required"],
    },
    role: {
      type: String,
      default: "user",
    },
    profile_image: {
      type: String,
      default:
        "https://adawayfarer.s3-us-west-2.amazonaws.com/profile_avatar.png",
    },
    jobs: [
      {
        type: mongoonse.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    reports: [
      {
        type: mongoonse.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
    career_coach: [
      {
        type: mongoonse.Schema.Types.ObjectId,
        ref: "Couch",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userShema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret;
  },
});

const User = mongoonse.model("User", userShema);

module.exports = User;
