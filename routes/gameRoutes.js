const express = require('express');
const Game = require('../models/game');
const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
  const games = await Game.findAll();
  res.json(games);
});

// Get a single game by id
router.get('/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  res.json(game);
});

// Create a new game
router.post('/', async (req, res) => {
  const { name, poster_image, developer, platforms, CategoryId } = req.body;
  const newGame = await Game.create({
    name,
    poster_image,
    developer,
    platforms,
    CategoryId,
  });
  res.json(newGame);
});

// Update a game
router.put('/:id', async (req, res) => {
  const { name, poster_image, developer, platforms, CategoryId } = req.body;
  const game = await Game.findByPk(req.params.id);
  game.name = name;
  game.poster_image = poster_image;
  game.developer = developer;
  game.platforms = platforms;
  game.CategoryId = CategoryId;
  await game.save();
  res.json(game);
});

// Delete a game
router.delete('/:id', async (req, res) => {
    try {
      await Game.destroy({ where: { id: req.params.id } });
      res.redirect('/'); // After deletion, redirect to the home page
    } catch (error) {
      res.status(500).send('An error occurred while trying to delete the game.');
    }
  });
module.exports = router;
