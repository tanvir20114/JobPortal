const express = require('express');
const router = express.Router();
const { connectDB, jobsCollection, applicationsCollection, ObjectId } = require('../config/db');
const { verifyFireBaseToken, verifyTokenEmail, applyLimiter } = require('../middleware/auth');

router.get('/', verifyFireBaseToken, verifyTokenEmail, async (req, res) => { 
    await connectDB;
  const email = req.query.email;
  const query = { applicant: email };
  const result = await applicationsCollection.find(query).toArray();
  for (const application of result) {
    const jobId = application.jobId;
    const jobQuery = { _id: new ObjectId(jobId) };
    const job = await jobsCollection.findOne(jobQuery);
    if (job) {
      application.company = job.company;
      application.title = job.title;
      application.company_logo = job.company_logo;
    } else {
      application.company = 'জবটি মুছে ফেলা হয়েছে';
      application.title = '';
      application.company_logo = '';
    }
  }
  res.send(result);
});

router.post('/',applyLimiter, verifyFireBaseToken, async (req, res) => { 
  await connectDB;
  const application = req.body;

  if(!application.jobId){
    return res.status(400).send({ message: 'jobId is required' });
  }

  let job;
  try {
    job = await jobsCollection.findOne({ _id: new ObjectId(application.jobId) });
  } catch (error) {
    return res.status(400).send({ message: 'Invalid jobId' });
  }
  if(!job){
    return res.status(404).send({ message: 'Job not found' });
  }

  if(!application.linkedIn && !application.github && !application.resume){
    return res.status(400).send({ message: 'Provide at least one of LinkedIn, GitHub, or resume link' });
  }

  application.applicant = req.decoded.email; 
  application.status = 'Pending';

  const result = await applicationsCollection.insertOne(application);
  res.send(result);
});

router.get('/job/:job_id', verifyFireBaseToken, async (req, res) => {
  await connectDB;
  const job_id = req.params.job_id;
  const job = await jobsCollection.findOne({_id: new ObjectId(job_id)});
  if(!job || job.hr_email !== req.decoded.email){
    return res.status(403).send({message: 'forbidden access'})
  }
  const result = await applicationsCollection.find({jobId: job_id}).toArray();
  result.forEach(app => { app.jobTitle = job.title; }); 
  res.send(result);
});

router.patch('/:id', verifyFireBaseToken, async (req, res) => { 
  await connectDB;
  const id = req.params.id;
  const application = await applicationsCollection.findOne({ _id: new ObjectId(id) });
  if(!application){
    return res.status(404).send({ message: 'application not found' });
  }
  const job = await jobsCollection.findOne({ _id: new ObjectId(application.jobId) });
  if(!job || job.hr_email !== req.decoded.email){
    return res.status(403).send({ message: 'forbidden access' });
  }
  const result = await applicationsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: req.body.status } }
  );
  res.send(result);
});

module.exports = router;