const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize database connection
const db = new Sequelize({
    dialect: process.env.DB_TYPE,
    storage: process.env.DB_NAME,
    logging: false
});

// User Model
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'reader',
        validate: {
            isIn: [['reader', 'author', 'editor']]
        }}
});

// Post Model
const Post = db.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Define Relationships
User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });


module.exports = {
    db,
    User,
    Post
};