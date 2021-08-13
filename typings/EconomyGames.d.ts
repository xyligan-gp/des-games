import Economy from 'discord-economy-super';

import { CoinflipData, DiceData, FishData, HuntData, RouletteData } from './EconomyGamesData';

import EconomyGamesOptions from './EconomyGamesOptions';

import UtilsManager from './UtilsManager';

declare class EconomyGames {
    constructor(economy: Economy, options?: EconomyGamesOptions);

    public utils: UtilsManager;

    public economy: Economy;
    public options: EconomyGamesOptions;

    /**
     * Method for checking the user base for the presence of a game object
     * @param guildID Guild ID
     * @param userID User ID
     * @returns Operation status
    */
    private fetchUser(guildID: string, userID: string): boolean;

    /**
     * Method for playing to 'Dice' game
     * @param guildID Guild ID
     * @param userID User ID
     * @param userBet User Bet
     * @param userPercent User Percent
     * @param gameType Game Type
     * @returns Game Data
    */
    public dice(guildID: string, userID: string, userBet?: number, userPercent?: number, gameType?: 'more' | 'less'): DiceData;

    /**
     * Method for playing to 'Coinflip' game
     * @param guildID Guild ID
     * @param userID User ID
     * @param userBet User Bet
     * @param gameType Game Type
     * @returns Game Data
    */
    public coinflip(guildID: string, userID: string, userBet?: number, gameType?: 'eagle' | 'tail'): CoinflipData;

    /**
     * Method for playing to 'Roulette' game
     * @param guildID Guild ID
     * @param userID User ID
     * @param userBet User Bet
     * @param userColor User Color
     * @returns Game Data
    */
    public roulette(guildID: string, userID: string, userBet: number, userColor: 'red' | 'green' | 'black'): RouletteData;

    /**
     * Method for playing to 'Fish' game
     * @param guildID Guild ID
     * @param userID User ID
     * @returns Game Data
    */
    public fish(guildID: string, userID: string): FishData;

    /**
     * Method for playing to 'Hunt' game
     * @param guildID Guild ID
     * @param userID User ID
     * @returns Game Data
    */
    public hunt(guildID: string, userID: string): HuntData;
}

export = EconomyGames;