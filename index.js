require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb'); // include mongodb library 
const url = "mongodb+srv://ankush:756624@cluster0.rmop2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; // Connection URL
const client = new MongoClient(url);
const jwt = require('jsonwebtoken');
const multer = require('multer')
const fs = require('fs')
const app = express()

var cookieParser = require('cookie-parser');
// --------------------------------------------------------
app.use(cors())//cross origin resource sharing
app.use(express.json())
app.use(cookieParser());// use for cookie
client.connect().then(()=>{
  console.log('connected')
}).catch((err=>{
  console.log('error')
})); // Use connect method to connect to the server
// ------------------------------------------------------------------------------
const db = client.db('adminpanel');// database Name
collection = db.collection('user'); // users table name
imgcollection = db.collection('userImg');// usersDoc table name
chatcollection = db.collection('chat');// usersDoc table name
// ---------------------------------------------------------------------------------
var storage = multer.diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {

    cb(null, Date.now() + ".." + file.originalname);
  }
});// for file upload destination path and name of file
var upload = multer({ storage });
//-----------------------------------------------------------------

//------------------------------------------ user verify isLogin or not by middleware------------------------------------------

const Authenticate = async (req, res, next) => {
  console.log(req.cookies.neha)

  try {
    token = req.cookies.neha
    const compair = await jwt.verify(token, process.env.SECRETKEY);
    const email = compair.email
    collection.findOne({
      email: req.body.email

    },
      function (err, result) {
        console.log("login Success", result)
        if (err) throw err;
        next();
      });
  }
  catch (err) {
    res.status(400).json('please lOGIN')
  }
}
//--------------------------------------------------------------------------------
app.post('/upload', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  imgcollection.insertOne({
    "doc": req.file.path,
    "des": req.body.des
  },
    function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });

  // req.body will hold the text fields, if there were any
})

// login Process
app.post('/login', function (req, res) {
  if (req.body.email != '') {
    console.log(req.body)
    console.log(req.body.email)
    collection.findOne({
      email: req.body.email
    },
      async function (err, result) {
        console.log("login Success")
        if (err) throw err;
        let password = req.body.password

        let isLogin = await bcrypt.compare(password, result.password)// for compair hash password
        if (isLogin) {
          token = await generateAuthToken(result)
          res.cookie('ankush', token);// set cookie where cookie name is neha
          res.status(200).json({ "messege": "loginSuccess", "email": result.email });
        }
        else {
          res.status(500).json({ "messege": "USER IS NOT FOUND" })
        }
      });
  }
  else {
    res.status(500).json({ "messege": "USER IS NOT FOUND" })
  }
})
// generate  Token Function
const generateAuthToken = (user) => {
  try {

    let token = jwt.sign({ 'email': user.email }, process.env.SECRETKEY, { expiresIn: '5000s' })
    return token
  }
  catch (error) {
    console.log(error);
  }
}
// user Registration 
app.post('/register', async function (req, res) {
  console.log("hey")
  let password = req.body.password
  const hashpassword = await bcrypt.hash(password, 10)// hash the password and save  into a database
  if (req.body.email != "" || req.body.password != "") {
    collection.insertOne({
      username: req.body.username,
      email: req.body.email,
      password: hashpassword,
    },
      function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
  else {
    res.status(400).json("Pleaswe Fill All the Fileds")
  }
})

// Logout process
app.get('/logout', (req, res) => {

  res.clearCookie('ankush');//clear a cookie
  res.status(200).json('logout success')
});

app.post('/userList', (req, res) => {
  collection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result);
  });
});



//delete user 
app.delete('/userDelete/:id', function (req, res) { // DELETE API, delete user
  console.log(req.params.id)
  collection.deleteOne({ _id: new ObjectId(req.params.id )})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => console.error(error))
})
app.put('/edit', function (req, res) { // PUT API, update user
  console.log(req.body)
  collection.findOneAndUpdate({ email: req.body.email }, {
    $set: {
      username: req.body.username,
    
    }
  }, {
    upsert: true
  })
    .then(result => {
      console.log(result)
      res.json(result)})
    .catch(error => console.error(error))
})
app.post('/isLogin', async function (req, res) {
  console.log(req.cookies.neha)
  try {
    token = req.cookies.neha
    const compair = await jwt.verify(token, process.env.SECRETKEY);
    const email = compair.email
    collection.findOne({
      email: email

    },
      function (err, result) {
        console.log("login Success", result)
        if (err) throw err;
        res.status(200).json(result)
      });
  }
  catch (err) {
    res.status(400).json('please lOGIN')
  }
});

if(process.env.Node_ENV == "production")
{
  app.use(express.static('client/build'))
  const path = require('path')
  __dirname = path.resolve()
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
app.listen(process.env.PORT, () => {
  console.log(`listing the port at ${process.env.PORT}`);
})