// World Bank API data return format
interface MetaData {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  sourceid: string;
  lastupdated: string;
}
interface Indicator {
  id: string;
  value: string;
}
interface Country {
  id: string;
  value: string;
}
interface DataItem {
  indicator: Indicator;
  country: Country;
  countryiso3code: string;
  date: string;
  value: number;
  unit: string;
  obs_status: string;
  decimal: number;
}
// Empty MetaData to return in case of error
const emptyMetaData: MetaData = {
  page: 0,
  pages: 0,
  per_page: 0,
  total: 0,
  sourceid: '',
  lastupdated: '',
};
export interface ApiResponse {
  meta: MetaData;
  data: DataItem[];
}

export class DataHandler {
  constructor() {}
  /**
   * Fetches data from an API and parses it as ApiResponse
   * @param url - The API endpoint to fetch data from
   * @returns A promise that resolves to ApiResponse
   */
  async fetchData(url: string): Promise<ApiResponse> {
    const requestOptions = {
      method: 'GET',
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`);
      }
      const rawData = (await response.json()) as [MetaData, DataItem[]];
      const [meta, data] = rawData;
      return {
        meta: meta,
        data: data,
      };
    } catch (error) {
      console.error('Error fetching data', error);
      // in case of failure, return empty ApiResponse object
      return {
        meta: emptyMetaData,
        data: [],
      };
    }
  }
  /**
   * Extracts just the population values from the fetched results
   * @param rawData - The ApiResponse data
   * @returns The populations as an array of numbers
   */
  extractPopulations(rawData: ApiResponse): Array<number> {
    const populations: Array<number> = [];
    let item;
    for (item of rawData.data) {
      if (item.value !== null) {
        populations.push(item.value);
      }
    }
    return populations || [];
  }

  /**
   * Sorts an array of numbers using the Selection Sort algorithm
   * @param array - The array of numbers to be sorted
   * @returns The array sorted in ascending order
   */
  selectionSort(array: Array<number>): Array<number> {
    if (array.length <= 1) {
      return array; // No need to sort these arrays
    }
    const length: number = array.length;
    for (let i = 0; i < length - 1; i++) {
      // assume this item is the smallest
      let minIndex = i;
      // look through the rest of the array (unsorted) for
      // anything smaller
      for (let j = i + 1; j < length; j++) {
        if (array[j] < array[minIndex]) {
          // found a new smallest item
          minIndex = j;
        }
      }
      // move the smallest element to the beginning of the unsorted section
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    return array;
  }
  /**
   * Sorts an array of numbers using the Bubble Sort algorithm
   * @param array - The array to be sorted
   * @returns The array sorted in ascending order
   */
  bubbleSort(array: number[]): number[] {
    if (array.length <= 1) {
      return array; // No need to sort these arrays
    }
    const length: number = array.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        //compare two adjacent elements
        // if the one to the right is smaller, swap them
        if (array[j] > array[j + i]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return array;
  }
  /**
   * Sorts an array of numbers using the Insertion Sort algorithm
   * @param array - Array of numbers to be sorted
   * @returns The array sorted in ascending order
   */
  insertionSort(array: number[]): number[] {
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
      // move all elements of the array up to index i - 1 that are greater
      //than key on position ahead of current position
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = key;
    }
    return array;
  }
  /**
   * Sorts an array of numbers using the Counting Sort algorithm
   * @param array - The array of positive numbers to be sorted
   * @returns A new array sorted in ascending order
   */
  countingSort(array: Array<number>): Array<number> {
    if (array.length <= 1) {
      return array; // No need to sort these arrays
    }
    const length: number = array.length;

    // Find the max element in the given array
    let maxNum = 0;
    for (let i = 0; i < length; i++) {
      maxNum = Math.max(maxNum, array[i]);
    }

    // The frequency of each element will be stored in a map
    const countMap: {[key: number]: number} = {};

    // Count the frequency of each element and map it to the corresponding
    // key in the count map
    for (let i = 0; i < length; i++) {
      countMap[array[i]] = (countMap[array[i]] || 0) + 1;
    }

    // Create outputArray using the information from the countArray
    const outputArray: Array<number> = [];
    for (let i = 0; i <= maxNum; i++) {
      if (countMap[i] !== undefined) {
        for (let j = 0; j < countMap[i]; j++) {
          outputArray.push(i);
        }
      }
    }
    return outputArray;
  }
}
