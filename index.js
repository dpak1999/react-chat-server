/** @format */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

// routes
const authroutes = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/', (req, res) => {
  const { message, user: sender, type, members } = req.body;

  if (type === 'message.new') {
    members
      .filter((member) => member.user._id !== sender.id)
      .forEach(({ user }) => {
        if (!user.online) {
          twilioClient.messages
            .create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid: messagingServiceSid,
              to: user.phoneNumber,
            })
            .then(() => console.log('Message sent'))
            .catch((err) => console.log(err));
        }
      });
    return res.status(200).send('Message sent');
  }

  return res.status(200).send('Not a new Message');
});

app.use('/auth', authroutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
