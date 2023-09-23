const express = require("express");
require("./db/mongoose.js");
const Patient = require("./models/patient.js");

// create a new instance of an Express.js router
const router = express.Router();

router.get("", async (req, res) => {
    try {
      res.status(201).send("Welcome to a RESTful API using Node.js, Express.js, and Mongoose for managing patient records in a healthcare system");
    } catch (e) {
      res.status(400).send(e);
    }
  });

router.post("/patients", async (req, res) => {
  const patient = new Patient(req.body);
  console.log(patient);
  try {
    await patient.save();
    res.status(201).send(patient);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/patients", async (req, res) => {
    try {
      const patientsList = await Patient.find({});
      res.send(patientsList);
    } catch (e) {
      res.status(500).send();
    }
});

router.get("/patients/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const patient = await Patient.findById(_id);

    if (!patient) {
      return res.status(404).send();
    }

    res.send(patient);
  } catch (e) {
    res.status(500).send("Patient not found");
  }
});

// export the router so that it can be used in other files
module.exports = router;