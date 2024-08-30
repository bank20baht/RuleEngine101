// src/index.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import RuleModel from './ruleModel';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const ruleEngine = new RuleModel();

const rule1 = RuleModel.create('temperature', '>=', 30, 'hot-weather-alert', 'The weather is too hot!');
const rule2 = RuleModel.create('humidity', '>=', 70, 'high-humidity-alert', 'The humidity is too high!');

ruleEngine.addRule(rule1);
ruleEngine.addRule(rule2);

app.post('/evaluate', async (req: Request, res: Response) => {
    const facts = req.body;

    try {
        const results = await ruleEngine.getEngine().run(facts);
        // @ts-ignore
        const events = results.events.map(event => event.params.message);
        res.json({ messages: events });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

app.listen(PORT, () => {
    console.log(`Rule engine API is running on port ${PORT}`);
});
