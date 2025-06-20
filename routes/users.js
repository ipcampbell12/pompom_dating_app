const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get one user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const newUser = await db.User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await db.User.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) return res.status(404).json({ error: 'User not found' });
        const updatedUser = await db.User.findByPk(req.params.id);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await db.User.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
