const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

// Import routes
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

// Use routes
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

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
