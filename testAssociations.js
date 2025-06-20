const db = require('./models');

async function test() {
    try {
        // Fetch a Location with its Events
        const location = await db.Location.findOne({
            where: { id: 1 },
            include: [{ model: db.Event, as: 'events' }]
        });
        console.log('Location with events:', JSON.stringify(location, null, 2));

        // Fetch an Event with its Location and Facilitator
        const event = await db.Event.findOne({
            where: { id: 1 },
            include: [
                { model: db.Location, as: 'location' },
                { model: db.User, as: 'facilitator' }
            ]
        });
        console.log('Event with location and facilitator:', JSON.stringify(event, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        await db.sequelize.close();
    }
}

test();
