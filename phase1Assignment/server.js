const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ChatApp')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(cors());
app.use(bodyParser.json());

// Define Mongoose Schemas and Models with Custom Collection Names

// User Schema with Password Hashing Middleware
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Store hashed password
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
}, { collection: 'user' });

// Hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
}, { collection: 'group' });

const messageSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { collection: 'message' });

const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Message = mongoose.model('Message', messageSchema);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a specific channel
  socket.on('joinChannel', async (channelId) => {
    socket.join(channelId);
    io.to(channelId).emit('userJoined', { userId: socket.id });
  });

  // Handle sending messages in a channel
  socket.on('sendMessage', async (data) => {
    const newMessage = new Message({
      groupId: data.channelId,
      senderId: data.userId,
      message: data.message
    });
    
    await newMessage.save();
    io.to(data.channelId).emit('receiveMessage', data);
  });
});

// Express Routes

// Register a new user with password hashing
app.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send('Username, email, and password are required');
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

// Login route for user authentication
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Email and password are required');

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Incorrect password');

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
});

// Add a new group
app.post('/groups', async (req, res) => {
  try {
    const newGroup = new Group(req.body);
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).send('Error creating group');
  }
});

// Get all messages in a group
app.get('/messages/:groupId', async (req, res) => {
  try {
    const messages = await Message.find({ groupId: req.params.groupId }).populate('senderId', 'username');
    res.json(messages);
  } catch (error) {
    res.status(500).send('Error retrieving messages');
  }
});

// Simple route to test database and collection
app.get('/mycollection', async (req, res) => {
  try {
    const testCollection = mongoose.connection.db.collection('testCollection');
    await testCollection.insertOne({ message: 'Hello, MongoDB!' });
    res.send('Database and collection created!');
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).send('Failed to create collection');
  }
});

// Start the server
server.listen(3000, () => console.log('Server running on http://localhost:3000'));
