const express = require('express')
const passport = require('passport');
const session = require('express-session');
const multer = require('multer')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const app = express()

var path = require('path')

require('./models')


var cors=require("cors");
app.use(cors({
    credentials: true, // Add Access-Control-Allow-Credentials to header
    origin: ["http://localhost:5000", "https://crm-t60.herokuapp.com"]
}));
app.use(express.json())
app.use(multer().any())
// set up author routes
const customerRouter = require('./routes/customerRouter')
const listsRouter = require('./routes/listsRouter')
const emailRouter = require('./routes/emailRouter')
const userRouter = require('./routes/userRouter')

const frontendStatic = express.static(path.join(__dirname, '/frontend/build'));
app.use(frontendStatic);

// handler for GET home page
//app.get('/', (req, res) => {
//    res.send('<h1>CRM System</h1>')
//})

// handler for author-management requests
// author routes are added onto the end of '/author-management'
app.use('/customers', customerRouter)
app.use('/lists', listsRouter)
app.use('/email', emailRouter)
app.use('/user', userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

app.listen(process.env.PORT || 3000, () => {
    console.log("The library app is running!")
   })
   
// For login

// Setup a session store signing the contents using the secret key
//require('./config/passport')(passport);
app.use(session({ secret: "a secret key for passport",
    resave: false,
    saveUninitialized: true,
 }));

// Middleware that's required for passport to operate
app.use(passport.initialize());

// Middleware to store user object
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

require("./models/index")
//require('./routes/utility')(passport);

// We need to add the following line so that we can access the body
// of a POST request as using JSON like syntax
app.use(express.urlencoded({ extended: true }));