const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'; // put in .env later
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

// Create new user (register)
router.post('/', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Hash the password
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Save with hashed password
        const newUser = await db.User.create({
            name,
            email,
            password_hash,
            role,
        });

        // Don’t return the password hash to the client
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        });
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
