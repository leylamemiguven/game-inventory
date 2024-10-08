const express = require('express');
const Category = require('../models/category');
const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

// Get a single category by id
router.get('/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  res.json(category);
});

// Create a new category
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newCategory = await Category.create({ name });
  res.json(newCategory);
});

// Update a category
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByPk(req.params.id);
  category.name = name;
  await category.save();
  res.json(category);
});

// Delete a category
router.delete('/:id', async (req, res) => {
  await Category.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Category deleted' });
});

module.exports = router;
