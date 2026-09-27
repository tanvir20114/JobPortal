const express = require('express');
const router = express.Router();
const { connectDB, jobsCollection, applicationsCollection, ObjectId } = require('../config/db');
const { verifyFireBaseToken, verifyTokenEmail, jobLimiter } = require('../middleware/auth');

router.get('/', async (req, res) => {
  await connectDB;
  const email = req.query.email;
  const query = {};
  if (email) {
    query.hr_email = email;
  }
  const result = await jobsCollection.find(query).toArray();
  res.send(result);
});

router.post('/', verifyFireBaseToken, jobLimiter, async (req, res) => { 
  await connectDB;
  const newJob = req.body;

  const requiredFields = ['title', 'company', 'location', 'salaryRange', 'description'];
  const missingFields = requiredFields.filter(field => !newJob[field]);
  if(missingFields.length > 0){
    return res.status(400).send({ message: `Missing required fields: ${missingFields.join(', ')}` });
  }

  if(!newJob.salaryRange.min || !newJob.salaryRange.max || !newJob.salaryRange.currency){
    return res.status(400).send({ message: 'Salary range is incomplete' });
  }

  newJob.hr_email = req.decoded.email;

  const result = await jobsCollection.insertOne(newJob);
  res.send(result);
});

router.get('/applications', verifyFireBaseToken, verifyTokenEmail, async (req, res) => {
  await connectDB;
  const email = req.query.email;
  const query = { hr_email: email };
  const jobs = await jobsCollection.find(query).toArray();
  for (const job of jobs) {
    const applicationQuery = { jobId: job._id.toString() };
    const application_count = await applicationsCollection.countDocuments(applicationQuery);
    job.application_count = application_count;
  }
  res.send(jobs);
});

router.get('/:id', async (req, res) => {
  await connectDB;
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await jobsCollection.findOne(query);
    if(!result){
      return res.status(404).send({message: 'Job not found'});
    }
    res.send(result);
  } catch (error) {
    res.status(400).send({message: 'Invalid job id'});
  }
});

router.delete('/:id', verifyFireBaseToken, async (req, res) => {
  await connectDB;
  const id = req.params.id;
  try {
    const job = await jobsCollection.findOne({_id: new ObjectId(id)});
    if(!job || job.hr_email !== req.decoded.email){
      return res.status(403).send({message: 'forbidden access'});
    }
    const result = await jobsCollection.deleteOne({_id: new ObjectId(id)});
    await applicationsCollection.deleteMany({ jobId: id }); 
    res.send(result);
  } catch (error) {
    res.status(400).send({message: 'Invalid job id'});
  }
});


module.exports = router;