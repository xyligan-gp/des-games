import Economy from 'discord-economy-super';

import ms from './modules/ms';
import parse from './modules/parse';

import UtilsManager from './managers/UtilsManager';

import EconomyGamesOptions from '../typings/EconomyGamesOptions';

import { CoinflipData, DiceData, FishData, HuntData, RouletteData } from '../typings/EconomyGamesData';

class EconomyGames {
    public utils: UtilsManager;

    public economy: Economy;
    public options: EconomyGamesOptions;

    constructor(economy: Economy, options: EconomyGamesOptions) {
        this.utils = new UtilsManager();

        this.economy = economy;
        this.options = this.utils.fetchOptions(options);
    }

    fetchUser(guildID: string, userID: string): boolean {
        const fetchUserData = this.economy.database.fetch(`${guildID}.${userID}`);
        const fetchUserGamesData = this.economy.database.fetch(`${guildID}.${userID}.games`);

        if(!fetchUserData) {
            this.economy.utils.reset(userID, guildID);
            this.economy.database.set(`${guildID}.${userID}.games`, { fish: { gamesCount: 0, lastGameDate: 0, lastGameReward: 0, totalReward: 0 }, hunt: { gamesCount: 0, lastGameDate: 0, lastGameReward: 0, totalReward: 0 } });

            return true;
        }else{
            if(!fetchUserGamesData) {
                this.economy.database.set(`${guildID}.${userID}.games`, { fish: { gamesCount: 0, lastGameDate: 0, lastGameReward: 0, totalReward: 0 }, hunt: { gamesCount: 0, lastGameDate: 0, lastGameReward: 0, totalReward: 0 } });

                return true;
            }else{
                return true;
            }
        }
    }

    dice(guildID: string, userID: string, userBet: number, userPercent: number, gameType: 'more' | 'less'): DiceData {
        const userBalance = this.economy.balance.fetch(userID, guildID);
        const winCoefficient = this.utils.getRandomNumber(2, 5);

        if(!userBet) userBet = this.utils.getRandomNumber(1, userBalance);
        if(!userPercent) userPercent = this.utils.getRandomNumber(1, 95);
        if(!gameType) gameType = (this.utils.getRandomString(['less', 'more']) as 'more' | 'less');

        if(userBalance < userBet) return { status: false, guildID: guildID, data: { user: { id: userID, balance: userBalance, percent: userPercent, bet: userBet }, game: { result: null, type: gameType, percent: 0, reward: 0, coefficient: winCoefficient } } };

        switch(gameType) {
            case 'less': {
                const gamePercent = this.utils.getRandomNumber(1, 95);

                if(gamePercent < userPercent) {
                    this.economy.balance.subtract(userBet, userID, guildID);

                    return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, percent: userPercent, bet: userBet }, game: { result: 'lose', type: gameType, percent: gamePercent, reward: 0, coefficient: winCoefficient } } };
                }else{
                    const reward = userBet * winCoefficient;

                    this.economy.balance.add(reward, userID, guildID);

                    return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, percent: userPercent, bet: userBet }, game: { result: 'win', type: gameType, percent: gamePercent, reward: reward, coefficient: winCoefficient } } };
                }
            }

            case 'more': {
                const gamePercent = this.utils.getRandomNumber(1, 95);
                
                if(gamePercent > userPercent) {
                    this.economy.balance.subtract(userBet, userID, guildID);

                    return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, percent: userPercent, bet: userBet }, game: { result: 'lose', type: gameType, percent: gamePercent, reward: 0, coefficient: winCoefficient } } };
                }else{
                    const reward = userBet * winCoefficient;

                    this.economy.balance.add(reward, userID, guildID);

                    return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, percent: userPercent, bet: userBet }, game: { result: 'win', type: gameType, percent: gamePercent, reward: reward, coefficient: winCoefficient } } };
                }
            }
        }
    }

    coinflip(guildID: string, userID: string, userBet: number, gameType: 'eagle' | 'tail'): CoinflipData {
        const userBalance = this.economy.balance.fetch(userID, guildID);
         
        if(!userBet) userBet = this.utils.getRandomNumber(1, userBalance);
        if(!gameType) gameType = (this.utils.getRandomString(['eagle', 'tail']) as 'eagle' | 'tail');

        if(userBalance < userBet) return { status: false, guildID: guildID, data: { user: { id: userID, balance: userBalance, bet: userBet, type: gameType }, game: { result: null, type: null, reward: 0 } } };

        switch(gameType) {
            case 'eagle': {
                const gameChooseType = this.utils.getRandomString(['eagle', 'tail']);

                if(gameType === gameChooseType) {
                    const reward = userBet * 2;

                    this.economy.balance.add(reward, userID, guildID);

                    return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, bet: userBet, type: gameType }, game: { result: 'win', type: gameChooseType, reward: reward } } };
                }else{
                    this.economy.balance.subtract(userBet, userID, guildID);

                    return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, bet: userBet, type: gameType }, game: { result: 'lose', type: gameChooseType, reward: 0 } } };
                }
            }

            case 'tail': {
                const gameChooseType = this.utils.getRandomString(['eagle', 'tail']);

                if(gameType === gameChooseType) {
                    const reward = userBet * 2;

                    this.economy.balance.add(reward, userID, guildID);

                    return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, bet: userBet, type: gameType }, game: { result: 'win', type: gameChooseType, reward: reward } } };
                }else{
                    this.economy.balance.subtract(userBet, userID, guildID);

                    return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, bet: userBet, type: gameType }, game: { result: 'lose', type: gameChooseType, reward: 0 } } };
                }
            }
        }
    }

    roulette(guildID: string, userID: string, userBet: number, userColor: 'red' | 'green' | 'black'): RouletteData {
        const userBalance = this.economy.balance.fetch(userID, guildID);

        if(!userBet) userBet = this.utils.getRandomNumber(1, userBalance);
        if(!userColor) userColor = (this.utils.getRandomString(['red', 'green', 'black']) as 'red' | 'green' | 'black');

        if(userBalance < userBet) return { status: false, guildID: guildID, data: { user: { id: userID, balance: userBalance, color: userColor, bet: userBet }, game: { result: null, color: null, reward: 0 } } };

        const gameData = [{ color: 'red', coefficient: 2 }, { color: 'green', coefficient: 4 }, { color: 'black', coefficient: 8 }];
        const gameColor = this.utils.getRandomString(['red', 'green', 'black']);

        if(userColor === gameColor) {
            const winCoefficient = gameData.find(data => data.color === userColor).coefficient;
            const reward = userBet * winCoefficient;

            this.economy.balance.add(reward, userID, guildID);

            return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, color: userColor, bet: userBet }, game: { result: 'win', color: gameColor, reward: reward } } };
        }else{
            this.economy.balance.subtract(userBet, userID, guildID);

            return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance, color: userColor, bet: userBet }, game: { result: 'lose', color: gameColor, reward: 0 } } };
        }
    }

    fish(guildID: string, userID: string): FishData {
        const userBalance = this.economy.balance.fetch(userID, guildID);
        const fishs = ['🐠 (Tropical Fish)', '🐟 (Fish)', '🐡 (Blow Fish)', '🐬 (Dolphin)', '🦐 (Shrimp)', '🦈 (Shark)', '🦂 (Scorpion)'];
        const userFish = this.utils.getRandomString(fishs);
        const reward = this.utils.getRandomNumber(1, this.options.fishConfig.maxAmount);
        const gameDate = this.economy.database.fetch(`${guildID}.${userID}.games.fish.lastGameDate`) || null;
        const lastGameDate = (ms(this.options.fishConfig.cooldown) - (Date.now() - gameDate || 0));

        if(lastGameDate > 0) return { status: false, guildID: guildID, data: { user: { id: userID, balance: userBalance }, game: { fish: null, reward: null }, time: { value: lastGameDate, pretty: parse(lastGameDate) } } };
    
        this.fetchUser(guildID, userID);
        
        const userFishData = this.economy.database.fetch(`${guildID}.${userID}.games.fish`);

        this.economy.database.set(`${guildID}.${userID}.games.fish`, { gamesCount: userFishData.gamesCount + 1, lastGameDate: Date.now(), lastGameReward: reward, totalReward: userFishData.totalReward + reward });
        this.economy.balance.add(reward, userID, guildID);

        return { status: true,  guildID: guildID, data: { user: { id: userID, balance: userBalance }, game: { fish: userFish, reward: reward }, time: { value: ms(this.options.fishConfig.cooldown), pretty: parse(ms(this.options.fishConfig.cooldown)) } } };
    }

    hunt(guildID: string, userID: string): HuntData {
        const userBalance = this.economy.balance.fetch(userID, guildID);
        const hunt = ['🐰 (Rabbit)', '🐸 (Frog)', '🐒 (Monkey)', '🐔 (Chicken)', '🐤 (Baby Chick)', '🐺 (Wolf)', '🐓 (Rooster)', '🦃 (Turkey)', '🐿 (Chipmunk)', '🐃 (Water Buffalo)', '🐂 (Ox)', '🐎 (Race Horse)', '🐖 (Pig)', '🐍 (Snake)', '🐄 (Cow)'];
        const userHunt = this.utils.getRandomString(hunt);
        const reward = this.utils.getRandomNumber(1, this.options.huntConfig.maxAmount);
        const gameDate = this.economy.database.fetch(`${guildID}.${userID}.games.hunt.lastGameDate`) || null;
        const lastGameDate = (ms(this.options.huntConfig.cooldown) - (Date.now() - gameDate || 0));

        if(lastGameDate > 0) return { status: false, guildID: guildID, data: { user: { id: userID, balance: userBalance }, game: { hunt: null, reward: null }, time: { value: lastGameDate, pretty: parse(lastGameDate) } } };

        this.fetchUser(guildID, userID);

        const userHuntData = this.economy.database.fetch(`${guildID}.${userID}.games.hunt`);

        this.economy.database.set(`${guildID}.${userID}.games.hunt`, { gamesCount: userHuntData.gamesCount + 1, lastGameDate: Date.now(), lastGameReward: reward, totalReward: userHuntData.totalReward + reward });
        this.economy.balance.add(reward, userID, guildID);

        return { status: true, guildID: guildID, data: { user: { id: userID, balance: userBalance }, game: { hunt: userHunt, reward: reward }, time: { value: ms(this.options.huntConfig.cooldown), pretty: parse(ms(this.options.huntConfig.cooldown)) } } };
    }
}

export = EconomyGames;