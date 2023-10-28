const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: String,
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      minlength: [8, "password must be at least 8 characters long"],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("fullName").get(function () {
  return this.firstName + this.lastName;
});

userSchema.pre("save", function (next) {
  console.log("full name field about to be populated::::");
  this.fullName = this.firstName + this.lastName;
  const hashedPassword = bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

userSchema.post("save", function (next) {
  const content = `a new  user ${this.fullName} has been add`;
  fs.writeFileSync("./Log/log.txt", content, { flag: a }, (err) => {
    console.log(err.message);
  });
});

module.exports = mongoose.model("user", userSchema);
