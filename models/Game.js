const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Game = sequelize.define('Game', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    poster_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    developer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    platforms: {
        type: DataTypes.STRING, // You can use JSON if you prefer
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Game.belongsTo(Category);

module.exports = Game;
