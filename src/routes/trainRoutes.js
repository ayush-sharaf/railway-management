const express = require('express');
const { addTrain, getTrains } = require('../controllers/trainController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/admin/train', authenticateToken, authorizeAdmin, addTrain);
router.get('/', getTrains);

module.exports = router;
