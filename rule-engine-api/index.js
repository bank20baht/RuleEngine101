const express = require('express');
const bodyParser = require('body-parser');
const engine = require('./rules');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/evaluate', async (req, res) => {
    const facts = req.body;

    try {
        const results = await engine.run(facts);
        const events = results.events.map(event => event.params.message);
        res.json({ messages: events });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Rule engine API is running on port ${PORT}`);
});
