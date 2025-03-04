const { Schema, model } = require("mongoose");
// require("mongoose").pluralize(null);

const bcrypt = require("bcrypt");
const saltRounds = 10;

const userScheme = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userScheme.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

const User = model("users", userScheme);

module.exports = User;
