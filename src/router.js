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

// GET /patients: Retrieve a list of all patients.
router.get("/patients", async (req, res) => {
    try {
      const patientsList = await Patient.find({});
      res.send(patientsList);
    } catch (e) {
      res.status(500).send();
    }
});

// GET /patients/:id: Retrieve a specific patient by their ID.
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

// POST /patients: Create a new patient.
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

// PUT /patients/:id: Update an existing patient by their ID.
router.put("/patients/:id", async (req, res) => {
    const _idFilter = { _id: req.params.id };
    const updateData = req.body;
    
    try {
      const newData = await Patient.findOneAndUpdate(_idFilter, updateData, { returnOriginal: false });
      res.status(201).send(newData);
    } catch (e) {
      res.status(400).send(e);
    }
});

// DELETE /patients/:id: Delete a patient by their ID.
  
// export the router so that it can be used in other files
module.exports = router;