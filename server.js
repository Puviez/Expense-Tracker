// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const session = require('express-session')

// =======================================
//              Configuration
// =======================================
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI

// =======================================
//              Middleware
// =======================================
// allows us to use put and delete methods
app.use(methodOverride('_method'))
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }))

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
  }))
// =======================================
//              Database
// =======================================
mongoose.connect(mongoURI,
	{
		useNewUrlParser    : true,
		useUnifiedTopology : true
	},
	() => {
		console.log('Mongo running at', mongoURI);
	}
);

mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

// =======================================
//              Controllers
// =======================================
const userController = require('./controllers/users.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

const transactionsController = require('./controllers/app.js')
app.use('/app',transactionsController)

const accountsController = require('./controllers/accounts.js')
app.use('/acc',accountsController)
// =======================================
//              Routes
// =======================================
app.get('/', (req, res) => {
    res.render('index.ejs', {
		currentUser: req.session.currentUser
	});
  })

app.get('/app', (req, res) => {
    res.render('./app/index.ejs', {
		currentUser: req.session.currentUser
	});
  })
  
// =======================================
//              Listener
// =======================================
app.listen(PORT, () => console.log('auth happening on port', PORT))