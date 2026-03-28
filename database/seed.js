const bcrypt = require('bcryptjs');
const { db, User, Post } = require('./setup');

// Initialize database
// Initialize database
async function initializeDatabase() {
    try {
        await db.authenticate();
        console.log('Database connection established successfully.');
        
        await db.sync({ force: true });
        console.log('Database synchronized successfully.');
        
        // Create sample users for testing
        const users = await User.bulkCreate([
            {
            username: 'reader',
            email: 'reader@example.com',
            password: hashedPassword,
            role: 'reader'
                },
            {
            username: 'author',
            email: 'author@example.com',
            password: hashedPassword,
            role: 'author'
                },
            {
            username: 'editor',
            email: 'editor@example.com',
            password: hashedPassword,
            role: 'editor'
            }
            ]);
            
            // Create sample posts
            await Post.bulkCreate([
                {
                    title: 'Getting Started with Node.js',
                    content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine. It allows you to run JavaScript on the server side...',
                    published: true,
                    authorId: users[1].id // author user
                },
                {
                    title: 'Understanding JWT Authentication',
                    content: 'JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties...',
                    published: true,
                    authorId: users[1].id // author user
                },
                {
                    title: 'Building REST APIs with Express',
                    content: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications...',
                    published: false,
                    authorId: users[1].id // author user
                },
                {
                    title: 'Database Design Best Practices',
                    content: 'Good database design is crucial for building scalable and maintainable applications. Here are some key principles to follow...',
                    published: true,
                    authorId: users[2].id // editor user
                },
                {
                    title: 'Introduction to Web Security',
                    content: 'Web security is a critical aspect of modern web development. This post covers common vulnerabilities and how to prevent them...',
                    published: false,
                    authorId: users[2].id // editor user
                }
            ]);
            
            console.log('Sample users created:');
            console.log('- reader@example.com / password123');
            console.log('- author@example.com / password123');
            console.log('- editor@example.com / password123');
            console.log('Sample posts created with various authors and publish states.');
        }
     catch (error) {
        console.error('Unable to connect to database:', error);
    }
}

initializeDatabase();