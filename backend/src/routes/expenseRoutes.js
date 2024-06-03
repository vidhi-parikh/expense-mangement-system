const express = require('express');
const {
  createExpense,
  getExpenses,
  updateExpense
} = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createExpense)
  .get(protect, getExpenses);

  router.route('/:id')
  .put(protect, updateExpense)

module.exports = router;
