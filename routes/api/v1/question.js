const express = require("express");
const router = express.Router();

// ----- Importing question_api controller ----- //
const questionApi = require('../../../controllers/api/v1/question_api');

router.post('/create', questionApi.createQuestion);
router.post('/:id/option/create', questionApi.createOption);
router.delete('/:id/delete', questionApi.deleteQuestion);
router.get('/:id', questionApi.viewQuestion);

module.exports = router;