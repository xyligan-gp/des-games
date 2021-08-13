import EconomyGamesOptions from "./EconomyGamesOptions";

declare class UtilsManager {
    /**
     * Method for fetching options
     * @param options Economy Games Options
     * @returns Fetched options
    */
    fetchOptions(options: EconomyGamesOptions): EconomyGamesOptions;

    /**
     * Method for getting random number value
     * @param min Minimum value
     * @param max Maximum value
     * @returns Random value
    */
    getRandomNumber(min: number, max: number): number;

    /**
     * Method for gtting random string
     * @param strings Strings List
     * @returns Random string
    */
    getRandomString(strings: string[]): string;
}

export = UtilsManager;