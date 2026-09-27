require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const port = process.env.PORT;

require('./config/firebase');

const jobsRoutes = require('./routes/jobs.routes');
const applicationsRoutes = require('./routes/applications.routes');
const messagesRoutes = require('./routes/messages.routes');


app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(mongoSanitize());


app.get("/", (req, res) => {
  res.send("career code cooking");
});

app.use('/jobs', jobsRoutes);
app.use('/applications', applicationsRoutes);
app.use('/messages', messagesRoutes);


app.listen(port, () => {
  console.log(`port is running ${port}`);
});

module.exports = app;