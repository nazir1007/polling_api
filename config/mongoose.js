//------require the Library--------//
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const dotenv = require("dotenv").config();


//Set up default mongoose connection
let mongoDB = process.env.MONGODB_URI || "mongodb://localhost/polling_api";

//------Connect to Mongo--------//
mongoose.connect(mongoDB, {

  useNewUrlParser: "true",
  useUnifiedTopology: "true"

});


//------acquire the connection (to check if it is successful)--------//
const db = mongoose.connection;


//------ error --------//
db.on('error',  console.error.bind(console, 'error connecting to db'));

//------ up and running then print the message --------//
db.once('open', () => {
    console.log('Successfully connected to the database');

})
