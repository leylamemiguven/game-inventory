const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sequelize = require('./database');
const gameRoutes = require('./routes/gameRoutes');
const Game = require('./models/game'); // Import Game model

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  // Allow DELETE/PUT requests in forms
app.use(express.static('public'));   // Serve static files (HTML forms)

// Use the routes
// app.use('/categories', categoryRoutes);
app.use('/games', gameRoutes);

// Sync database models
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

//for testing 
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database & tables created!');
// });   


// Home page route - Display games and option to delete/add
app.get('/', async (req, res) => {
  try {
    const games = await Game.findAll();
    let html = `
    <link rel="stylesheet" type="text/css" href="/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
      <h1>Game Inventory</h1>
      <div class=props>
      <p class="prop"> </p>
      <p class="prop">Name</p>
      <p class="prop">Genre</p>
      <p class="prop">Developer</p>
      <p class="prop">Platforms</p>
      <p class="prop"> </p>
      

      </div>
      <ul>
    `;

    games.forEach(game => {
      html += `<li>
                    <div class="game">
                        <div class="game-prop"> <img src="${game.poster_image}"/> </div>
                        <div class="game-prop"> <a href="/games/${game.id}">${game.name}</a></div>
                        <div class="game-prop"> ${game.genre}</div>
                        <div class="game-prop"> ${game.developer} </div>
                        <div class="game-prop"> ${game.platforms} </div>
                        <div class="game-prop"><a></a><form action="/games/${game.id}?_method=DELETE" method="POST" style="display:inline;">
                        <button type="submit">Delete</button></form></a></div>
            
                    </div>

             </li>`;
    });

    html += `</ul>
      <a href="/addGameForm.html">Add a new game</a>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
