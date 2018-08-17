const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schools = require('./routes/schools');
const book = require('./routes/booking');
const cors = require('cors')
const app = express();
const users=require('./routes/users');
const passport = require('passport');

// Body parser middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Config
app.use(passport.initialize());
require('./config/passport')(passport);

// // DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.json({ msg: "Welcome to iEvent DB" }));
// app.get('/about', (req, res) => res.send("Our company was founded in 2015"));
app.use('/schools', schools);

app.use('/book',book);
app.use('/user',users);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
