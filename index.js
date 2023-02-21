const express = require("express");
const app = express();
const port = 500;

const db = require('./config/mongoose');


// ----- middleware for parse form data ----- //
app.use(express.urlencoded({ extended: true }));

//------ Calling the express.json() method for parsing ------//
app.use(express.json());

app.use('/', require('./routes'))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});