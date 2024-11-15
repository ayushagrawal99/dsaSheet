const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const sheetRoutes = require('./sheet');

router.use('/auth', authRoutes); 
router.use('/sheet', sheetRoutes); 

module.exports = router;
