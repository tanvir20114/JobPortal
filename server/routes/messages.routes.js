const express = require('express');
const router = express.Router();
const { connectDB, conversationsCollection, messagesCollection, jobsCollection, ObjectId } = require('../config/db');
const { verifyFireBaseToken } = require('../middleware/auth');


router.get('/conversations', verifyFireBaseToken, async (req, res) => {
  await connectDB;
  const email = req.decoded.email;

  const result = await conversationsCollection
    .find({ participants: email })
    .sort({ lastMessageAt: -1 })
    .toArray();
  res.send(result);
});


router.post('/conversations', verifyFireBaseToken, async (req, res) => {
    await connectDB;

  try {
    const email = req.decoded.email;
    const { jobId, applicationId, otherEmail } = req.body;
    
    if (!jobId || !otherEmail) {
      return res.status(400).send({ message: 'jobId and otherEmail are required' });
    }
    if (!ObjectId.isValid(jobId)) {
      return res.status(400).send({ message: 'Invalid jobId' });
    }
    if (otherEmail === email) {
      return res.status(400).send({ message: 'Cannot start a conversation with yourself' });
    }

    const job = await jobsCollection.findOne({ _id: new ObjectId(jobId) });
    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }
    const isRelated = job.hr_email === email || job.hr_email === otherEmail;
    if (!isRelated) {
      return res.status(403).send({ message: 'forbidden access' });
    }

    const existing = await conversationsCollection.findOne({
      jobId,
      participants: { $all: [email, otherEmail] },
    });
    if (existing) {
      return res.send(existing);
    }

    const newConversation = {
      jobId,
      applicationId: applicationId || null,
      participants: [email, otherEmail],
      lastMessage: '',
      lastMessageAt: new Date(),
      createdAt: new Date(),
    };
    const insertResult = await conversationsCollection.insertOne(newConversation);
    
    res.send({ ...newConversation, _id: insertResult.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});


router.get('/conversations/:id/messages', verifyFireBaseToken, async (req, res) => {
  await connectDB;
  const email = req.decoded.email;
  const conversationId = req.params.id;

  let conversation;
  try {
    conversation = await conversationsCollection.findOne({ _id: new ObjectId(conversationId) });
  } catch (error) {
    return res.status(400).send({ message: 'Invalid conversation id' });
  }
  if (!conversation) {
    return res.status(404).send({ message: 'Conversation not found' });
  }
  if (!conversation.participants.includes(email)) {
    return res.status(403).send({ message: 'forbidden access' });
  }

  const messages = await messagesCollection
    .find({ conversationId })
    .sort({ createdAt: 1 })
    .toArray();

  await messagesCollection.updateMany(
    { conversationId, sender: { $ne: email }, read: false },
    { $set: { read: true } }
  );

  res.send(messages);
});

router.post('/conversations/:id/messages', verifyFireBaseToken, async (req, res) => {
  await connectDB;
  const email = req.decoded.email;
  const conversationId = req.params.id;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).send({ message: 'Message text is required' });
  }

  let conversation;
  try {
    conversation = await conversationsCollection.findOne({ _id: new ObjectId(conversationId) });
  } catch (error) {
    return res.status(400).send({ message: 'Invalid conversation id' });
  }
  if (!conversation) {
    return res.status(404).send({ message: 'Conversation not found'});
  }
  if (!conversation.participants.includes(email)) {
    return res.status(403).send({ message: 'forbidden access' });
  }

  const newMessage = {
    conversationId,
    sender: email, 
    text: text.trim(),
    createdAt: new Date(),
    read: false,
  };
  const insertResult = await messagesCollection.insertOne(newMessage);

  await conversationsCollection.updateOne(
    { _id: new ObjectId(conversationId) },
    { $set: { lastMessage: newMessage.text, lastMessageAt: newMessage.createdAt } }
  );

  res.send({ ...newMessage, _id: insertResult.insertedId });
});

module.exports = router;