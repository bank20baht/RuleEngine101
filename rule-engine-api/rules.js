// rules.js

const { Engine } = require('json-rules-engine');

// Create a new instance of the rule engine
const engine = new Engine();

// Define some rules
const rules = [
    {
        conditions: {
            any: [{
                fact: 'temperature',
                operator: 'greaterThanInclusive',
                value: 30
            }]
        },
        event: {
            type: 'hot-weather-alert',
            params: {
                message: 'The weather is too hot!'
            }
        }
    },
    {
        conditions: {
            any: [{
                fact: 'humidity',
                operator: 'greaterThanInclusive',
                value: 70
            }]
        },
        event: {
            type: 'high-humidity-alert',
            params: {
                message: 'The humidity is too high!'
            }
        }
    }
];

// Add rules to the engine
rules.forEach(rule => engine.addRule(rule));

// Export the engine
module.exports = engine;
