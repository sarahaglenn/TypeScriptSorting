"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonHandler = void 0;
class PersonHandler {
    constructor() { }
    /**
     * Simple Getting started function
     * Displays a welcome message using a person interface
     * @param person - An object with first and last name
     * @returns A welcome message
     */
    welcomePerson(person) {
        return `Welcome to TypeScript, ${person.firstName} ${person.lastName}`;
    }
}
exports.PersonHandler = PersonHandler;
//# sourceMappingURL=personHandler.js.map