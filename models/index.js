// import comments js
const comment = require('./comment')
// import post file
const Post = require('./Post');
// import User file 
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

comment.belongsTo(comment, {
    foreignKey: 'userId',
});

comment.belongsTo(Post, {
    foreignKey: 'postId',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

module.exports = {User, comment, Post}