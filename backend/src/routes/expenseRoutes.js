const express = require('express');
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getTotalExpensesByCategory
} = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createExpense)
  .get(protect, getExpenses);

router.route('/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

router.route('/summary')
  .get(protect, getTotalExpensesByCategory);

module.exports = router;
