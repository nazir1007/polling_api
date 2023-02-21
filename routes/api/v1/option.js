// ----- Importing 
const express = require("express");
const router = express.Router();

// ----- Importing option_api controller ----- //
const optionApi = require('../../../controllers/api/v1/option_api')

router.post('/:id/addVote', optionApi.addVote);
router.delete('/:id/delete', optionApi.deleteOption);

module.exports = router;