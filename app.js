const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Database connected!');
    } catch (err) {
        console.error('❌ Unable to connect to database:', err);
    }
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
