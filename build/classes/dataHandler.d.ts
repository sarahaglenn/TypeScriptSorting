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
export interface ApiResponse {
    meta: MetaData;
    data: DataItem[];
}
export declare class DataHandler {
    constructor();
    /**
     * Fetches data from an API and parses it as ApiResponse
     * @param url - The API endpoint to fetch data from
     * @returns A promise that resolves to ApiResponse
     */
    fetchData(url: string): Promise<ApiResponse>;
    /**
     * Extracts just the population values from the fetched results
     * @param rawData - The ApiResponse data
     * @returns The populations as an array of numbers
     */
    extractPopulations(rawData: ApiResponse): Array<number>;
    /**
     * Sorts an array of numbers using the Selection Sort algorithm
     * @param array - The array of numbers to be sorted
     * @returns The array sorted in ascending order
     */
    selectionSort(array: Array<number>): Array<number>;
    /**
     * Sorts an array of numbers using the Bubble Sort algorithm
     * @param array - The array to be sorted
     * @returns The array sorted in ascending order
     */
    bubbleSort(array: number[]): number[];
    /**
     * Sorts an array of numbers using the Insertion Sort algorithm
     * @param array - Array of numbers to be sorted
     * @returns The array sorted in ascending order
     */
    insertionSort(array: number[]): number[];
    /**
     * Sorts an array of numbers using the Counting Sort algorithm
     * @param array - The array of positive numbers to be sorted
     * @returns A new array sorted in ascending order
     */
    countingSort(array: Array<number>): Array<number>;
}
export {};
