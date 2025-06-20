const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all events with location and facilitator info
router.get('/', async (req, res) => {
    try {
        const events = await db.Event.findAll({
            include: [
                { model: db.Location, as: 'location' },
                { model: db.User, as: 'facilitator' }
            ]
        });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get one event by ID with associations
router.get('/:id', async (req, res) => {
    try {
        const event = await db.Event.findByPk(req.params.id, {
            include: [
                { model: db.Location, as: 'location' },
                { model: db.User, as: 'facilitator' }
            ]
        });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new event
router.post('/', async (req, res) => {
    try {
        const newEvent = await db.Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an event by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await db.Event.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) return res.status(404).json({ error: 'Event not found' });
        const updatedEvent = await db.Event.findByPk(req.params.id);
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an event by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await db.Event.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) return res.status(404).json({ error: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
