const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

const VotesModel = db.define('votes', {
    target_type: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    target_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    vote_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    db,
    tableName: 'votes', 
    underscored: true,
    timestamps: false, 
    indexes: [
        {
            unique: true,
            fields: ['target_type', 'target_id', 'user_id'],
        },
    ],
});

module.exports = { VotesModel }; 

