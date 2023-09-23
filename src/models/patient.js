const mongoose = require("mongoose");

const Patient = mongoose.model("Patient", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a postive number");
      }
    },
  },
  gender: {
    type: String,
    trim: true,
  },
  medicalHistory: [{
    type: String
  }],
  contactInformation: {
    phoneNumber: String,
    email: String
  }
});

module.exports = Patient;