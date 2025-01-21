// Interfaces
export interface Person {
  firstName: string;
  lastName: string;
}
export class PersonHandler {
  constructor() {}
  /**
   * Simple Getting started function
   * Displays a welcome message using a person interface
   * @param person - An object with first and last name
   * @returns A welcome message
   */
  welcomePerson(person: Person): string {
    return `Welcome to Visual Studio Code ${person.firstName} ${person.lastName}`;
  }
}
