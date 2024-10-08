const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

// Create a genre
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newGenre = await Genre.create({ name });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error creating genre.');
  }
});

// Update a genre
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      genre.name = name;
      await genre.save();
      res.redirect('/');
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (error) {
    res.status(500).send('Error updating genre.');
  }
});

// Delete a genre
router.delete('/:id', async (req, res) => {
  try {
    await Genre.destroy({ where: { id: req.params.id } });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error deleting genre.');
  }
});

module.exports = router;
