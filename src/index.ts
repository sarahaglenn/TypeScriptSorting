import {DataHandler, ApiResponse} from './classes/dataHandler';
import {PersonHandler} from './classes/personHandler';

// Runtime Code
async function main() {
  // Greeting a person
  const personHandler = new PersonHandler();
  const sarah = {
    firstName: 'Sarah',
    lastName: 'Glenn',
  };
  console.log('Hello World');
  console.log(`${personHandler.welcomePerson(sarah)}\n`);

  // Retrieving and sorting data
  const dataHandler = new DataHandler();

  //Test array with 200 items in random order
  const largeArray: Array<number> = [
    13, 12, 11, 1, 1, 6, 3, 10, 16, 12, 3, 12, 10, 7, 12, 5, 14, 10, 18, 13, 18,
    8, 15, 1, 9, 9, 20, 19, 7, 19, 0, 5, 20, 15, 18, 15, 10, 1, 1, 12, 9, 8, 20,
    1, 18, 5, 18, 16, 13, 20, 10, 3, 16, 12, 1, 10, 0, 9, 9, 9, 8, 17, 2, 14,
    17, 6, 19, 2, 8, 12, 5, 8, 13, 8, 12, 20, 3, 16, 0, 2, 8, 13, 14, 13, 12,
    19, 8, 18, 15, 5, 10, 15, 17, 18, 0, 2, 11, 4, 1, 13, 11, 11, 0, 18, 10, 14,
    3, 11, 13, 13, 9, 1, 14, 17, 3, 11, 4, 2, 7, 9, 20, 8, 15, 3, 14, 14, 7, 9,
    20, 7, 0, 11, 7, 19, 9, 4, 8, 0, 9, 2, 15, 20, 16, 4, 15, 1, 15, 5, 18, 1,
    17, 18, 2, 6, 2, 19, 20, 4, 12, 15, 3, 0, 9, 3, 14, 19, 18, 12, 5, 7, 10, 1,
    5, 2, 8, 0, 2, 18, 1, 7, 19, 11, 16, 20, 6, 10, 19, 3, 1, 9, 2, 0, 1, 1, 17,
    19, 4, 18, 10, 9,
  ];
  // Test array with fake (smaller) population data
  const populationArray = [
    754832, 125630, 547891, 839211, 289375, 1913567, 472589, 617943, 382150,
    145209, 793210, 458731, 934862, 682140, 1253491,
  ];

  /**
   * Sorts a given array using a given sorting method
   * @param array An array of numbers to be sorted
   * @param method The sorting method to be used
   */
  function calculateSort(array: Array<number>, method: Function) {
    const start = performance.now();
    method(array);
    const end = performance.now();
    printResults(method.name, start, end);
  }
  console.log('Sorting 200 integers between 0 and 20');
  calculateSort(largeArray, dataHandler.selectionSort);
  calculateSort(largeArray, dataHandler.bubbleSort);
  calculateSort(largeArray, dataHandler.countingSort);
  calculateSort(largeArray, dataHandler.insertionSort);
  console.log('Sorting 15 fake populations');
  calculateSort(populationArray, dataHandler.selectionSort);
  calculateSort(populationArray, dataHandler.bubbleSort);
  calculateSort(populationArray, dataHandler.countingSort);
  calculateSort(populationArray, dataHandler.insertionSort);

  // Retrieve population data for 50 cities
  let url =
    'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL/?format=json&per_page=50&date=2020';
  try {
    const results: ApiResponse = await dataHandler.fetchData(url);
    // console.log(results);
    const populations: Array<number> = dataHandler.extractPopulations(results);
    // console.log(populations);

    console.log('Sorting 50 real populations');
    calculateSort(populations, dataHandler.selectionSort);
    calculateSort(populations, dataHandler.bubbleSort);
    calculateSort(populations, dataHandler.insertionSort);
  } catch (error) {
    console.log(error);
  }
  // Retrieve population data
  url =
    'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL/?format=json&per_page=17000&date=2020';
  try {
    const results: ApiResponse = await dataHandler.fetchData(url);
    // console.log(results);
    const populations: Array<number> = dataHandler.extractPopulations(results);
    // console.log(populations);

    console.log('Sorting 17000 real populations');
    calculateSort(populations, dataHandler.selectionSort);
    calculateSort(populations, dataHandler.bubbleSort);
    calculateSort(populations, dataHandler.insertionSort);
  } catch (error) {
    console.log(error);
  }
}

main().catch(error => console.error('Unhandled error:', error));

function printResults(sortMethod: string, start: number, end: number) {
  console.log(
    `  ${sortMethod} sort took ${(end - start).toFixed(4)} ms to execute`,
  );
}
