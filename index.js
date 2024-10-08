const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sequelize = require('./database');
const gameRoutes = require('./routes/gameRoutes');  // Import your game routes
const Game = require('./models/game'); // Import Game model

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for parsing requests, handling PUT/DELETE requests, and serving static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));  // Serve static files like CSS

// Use the game routes
app.use('/games', gameRoutes);

// Sync database models
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Home page route - Display games and option to delete/add
app.get('/', async (req, res) => {
  try {
    const games = await Game.findAll(); // Fetch games from the database
    res.render('index', { games });  // Render the EJS template and pass the games data
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).send('An error occurred');
  }
});

app.get('/games/:id/edit', async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id); // Find the game by its ID

    if (game) {
      res.render('edit-game', { game }); // Render the edit form template with the game data
    } else {
      res.status(404).send('Game not found');
    }
  } catch (error) {
    console.error('Error fetching game for editing:', error);
    res.status(500).send('An error occurred while fetching game for editing.');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
