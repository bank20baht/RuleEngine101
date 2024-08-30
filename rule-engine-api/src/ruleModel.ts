// src/ruleModel.ts

import { Engine, RuleProperties } from "json-rules-engine";

class RuleModel {
  private engine: Engine;

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
   * @returns {RuleProperties} - The constructed rule
   */
  static create(
    fact: string,
    operator: string,
    value: number | string,
    type: string,
    message: string
  ): RuleProperties {
    const rule: RuleProperties = {
      conditions: {
        any: [
          {
            fact: fact,
            operator: RuleModel.mapOperator(operator),
            value: value,
          },
        ],
      },
      event: {
        type: type,
        params: {
          message: message,
        },
      },
    };

    return rule;
  }

  /**
   * Map human-readable operators to engine operators
   * @param {string} operator - The operator to map
   * @returns {string} - Mapped operator
   */
  private static mapOperator(operator: string): string {
    const operatorMap: { [key: string]: string } = {
      ">": "greaterThan",
      ">=": "greaterThanInclusive",
      "<": "lessThan",
      "<=": "lessThanInclusive",
      "==": "equal",
      "!=": "notEqual",
    };

    return operatorMap[operator] || operator;
  }

  /**
   * Add rule to engine
   * @param {RuleProperties} rule - The rule to add to the engine
   */
  addRule(rule: RuleProperties): void {
    this.engine.addRule(rule);
  }

  /**
   * Get the engine instance
   * @returns {Engine} - The rule engine instance
   */
  getEngine(): Engine {
    return this.engine;
  }
}

export default RuleModel;
