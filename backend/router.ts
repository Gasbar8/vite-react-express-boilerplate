import express from 'express';

const router = express.Router();

router.get('/events', async (_req, res) => {    
    const events = [
        { id: 1, name: "Event 1" },
        { id: 2, name: "Event 2" }
    ];
    res.json(events);
});

export default router;