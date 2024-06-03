const express = require('express');
const {
  createExpense,
} = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createExpense)


module.exports = router;
