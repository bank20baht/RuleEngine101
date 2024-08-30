// ruleModel.js

const { Engine } = require('json-rules-engine');

class RuleModel {
    constructor() {
        this.engine = new Engine();
    }

    /**
     * Create and add a rule to the engine
     * @param {string} fact - The fact to evaluate (e.g., temperature)
     * @param {string} operator - The operator for the condition (e.g., >, <, ==)
     * @param {number|string} value - The value to compare the fact against
     * @param {string} type - The event type (e.g., hot-weather-alert)
     * @param {string} message - The message to include in the event
     */
    static create(fact, operator, value, type, message) {
        const rule = {
            conditions: {
                any: [{
                    fact: fact,
                    operator: this.mapOperator(operator),
                    value: value
                }]
            },
            event: {
                type: type,
                params: {
                    message: message
                }
            }
        };

        return rule;
    }

    /**
     * Map human-readable operators to engine operators
     * @param {string} operator - The operator to map
     * @returns {string} - Mapped operator
     */
    static mapOperator(operator) {
        const operatorMap = {
            '>': 'greaterThan',
            '>=': 'greaterThanInclusive',
            '<': 'lessThan',
            '<=': 'lessThanInclusive',
            '==': 'equal',
            '!=': 'notEqual'
        };

        return operatorMap[operator] || operator;
    }

    /**
     * Add rule to engine
     * @param {Object} rule - The rule to add to the engine
     */
    addRule(rule) {
        this.engine.addRule(rule);
    }

    /**
     * Get the engine instance
     * @returns {Engine} - The rule engine instance
     */
    getEngine() {
        return this.engine;
    }
}

module.exports = RuleModel;
