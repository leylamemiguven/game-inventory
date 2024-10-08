const express = require('express');
const Game = require('../models/game');
const router = express.Router();

// Get all games and render them in the index.ejs template
router.get('/', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.render('index', { games });  // Render index.ejs with the list of games
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).send('An error occurred while fetching games.');
  }
});

// Serve the "Add Game" form
router.get('/new', (req, res) => {
  res.render('add-game');  // Renders the 'add-game.ejs' template
});


// Get a single game by id and render a game view (optional)
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game) {
      res.render('viewGame', { game });  // You can create a viewGame.ejs for this
    } else {
      res.status(404).send('Game not found');
    }
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).send('An error occurred while fetching the game.');
  }
});

// Create a new game and redirect to the homepage
router.post('/', async (req, res) => {
  try {
    const { name, poster_image, developer, platforms, genre } = req.body;

    // Create the new game
    await Game.create({
      name,
      poster_image,
      developer,
      platforms,
      genre // Associate the game with the selected genre
    });

    // Redirect back to the homepage after the game is added
    res.redirect('/');
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).send('An error occurred while creating the game.');
  }
});

// Update a game and redirect to the homepage
router.put('/:id', async (req, res) => {
  try {
    const { name, poster_image, developer, platforms, genre } = req.body;
    const game = await Game.findByPk(req.params.id);
    
    if (game) {
      // Update the game properties
      game.name = name;
      game.poster_image = poster_image;
      game.developer = developer;
      game.platforms = platforms;
      game.genre = genre;
      
      // Save the updated game
      await game.save();

      // Redirect to the homepage after updating
      res.redirect('/games');
    } else {
      res.status(404).send('Game not found');
    }
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).send('An error occurred while updating the game.');
  }
});

// Delete a game and redirect to the homepage
router.delete('/:id', async (req, res) => {
  try {
    await Game.destroy({ where: { id: req.params.id } });
    res.redirect('/games'); // After deletion, redirect to the games list
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).send('An error occurred while trying to delete the game.');
  }
});

module.exports = router;
