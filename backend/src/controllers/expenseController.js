const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
  const { amount, category, description } = req.body;
  try {
    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      description,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};