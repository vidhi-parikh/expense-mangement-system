const Expense = require('../models/Expense');
const logger = require('../services/logger_service');

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
      logger.info('Expense created successfully', { userId: req.user.id, expenseId: expense._id });
      res.status(201).json(expense);
    } catch (err) {
      logger.error('Error creating expense', { error: err.message, stack: err.stack });
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.getExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find({ user: req.user.id });
      logger.info('Expenses retrieved successfully', { userId: req.user.id });
      res.status(200).json(expenses);
    } catch (err) {
      logger.error('Error retrieving expenses', { error: err.message, stack: err.stack });
      res.status(500).json({ error: 'Server error' });
    }
  };

exports.updateExpense = async (req, res) => {
    const { amount, category, description } = req.body;
    try {
      const expense = await Expense.findById(req.params.id);
      if (!expense || expense.user.toString() !== req.user.id) {
        logger.warn('Expense not found', { expenseId: req.params.id });
        return res.status(404).json({ error: 'Expense not found' });
      }
      expense.amount = amount;
      expense.category = category;
      expense.description = description;
      await expense.save();
      logger.info('Expense updated successfully', { userId: req.user.id, expenseId: expense._id });
      res.status(200).json(expense);
    } catch (err) {
      logger.error('Error updating expense', { error: err.message, stack: err.stack });
      res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
      const expense = await Expense.findById(req.params.id);
      if (!expense || expense.user.toString() !== req.user.id) {
        logger.warn('Expense not found', { expenseId: req.params.id }); 
        return res.status(404).json({ error: 'Expense not found' });
      }
      await expense.deleteOne()
      logger.info('Expense deleted successfully', { userId: req.user.id, expenseId: req.params.id });
      res.status(200).json({ message: 'Expense removed' });
    } catch (err) {
      logger.error('Error deleting expense', { error: err.message, stack: err.stack });
      res.status(500).json({ error: 'Server error' });
    }
};
