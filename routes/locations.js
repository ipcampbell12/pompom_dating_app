const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all locations
router.get('/', async (req, res) => {
    try {
        const locations = await db.Location.findAll();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get one location by ID
router.get('/:id', async (req, res) => {
    try {
        const location = await db.Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ error: 'Location not found' });
        res.json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new location
router.post('/', async (req, res) => {
    try {
        const newLocation = await db.Location.create(req.body);
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a location by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await db.Location.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) return res.status(404).json({ error: 'Location not found' });
        const updatedLocation = await db.Location.findByPk(req.params.id);
        res.json(updatedLocation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a location by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await db.Location.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) return res.status(404).json({ error: 'Location not found' });
        res.json({ message: 'Location deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
