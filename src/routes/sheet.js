const express = require('express');
const router = express.Router();
const sheetController = require('../controllers/sheet');
const {userAuth} = require('../middleware/auth');

router.get('/dsa_sheet', userAuth, sheetController.dsaSheet);
router.post('/complete_topic', userAuth, sheetController.completeATopic);

module.exports = router;