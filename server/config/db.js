const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const jobsCollection = client.db('careerCodeFour').collection('jobsFour');
const applicationsCollection = client.db('careerCodeFour').collection('ApplicationsFour');
const conversationsCollection = client.db('careerCodeFour').collection('ConversationsFour');
const messagesCollection = client.db('careerCodeFour').collection('MessagesFour');

const connectDB = client.connect()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

module.exports = {
  client,
  connectDB,
  jobsCollection,
  applicationsCollection,
  ObjectId,
  conversationsCollection, 
  messagesCollection   
};