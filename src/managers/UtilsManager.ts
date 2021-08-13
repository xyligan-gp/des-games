import EconomyGamesOptions from '../../typings/EconomyGamesOptions';

import ms from '../modules/ms';

class UtilsManager {
    constructor() {};
    
    fetchOptions(options: EconomyGamesOptions): EconomyGamesOptions {
        if(!options) {
            options = {
                fishConfig: {
                    maxAmount: 1000,
                    cooldown: '1d'
                },

                huntConfig: {
                    maxAmount: 1000,
                    cooldown: '1d'
                }
            }
        }else{
            if(typeof options.fishConfig != 'object') {
                options.fishConfig = {
                    maxAmount: 1000,
                    cooldown: '1d'
                }
            }else{
                if(!options.fishConfig.cooldown) options.fishConfig.cooldown = '1d';
                if(typeof options.fishConfig.cooldown != 'string') options.fishConfig.cooldown = '1d';
                if(!ms(options.fishConfig.cooldown)) options.fishConfig.cooldown = '1d';

                if(!options.fishConfig.maxAmount) options.fishConfig.maxAmount = 1000;
                if(typeof options.fishConfig.maxAmount != 'number') options.fishConfig.maxAmount = 1000;
                if(options.fishConfig.maxAmount < 1) options.fishConfig.maxAmount = 1000;
            }

            if(typeof options.huntConfig != 'object') {
                options.huntConfig = {
                    maxAmount: 1000,
                    cooldown: '1d'
                }
            }else{
                if(!options.huntConfig.cooldown) options.huntConfig.cooldown = '1d';
                if(typeof options.huntConfig.cooldown != 'string') options.huntConfig.cooldown = '1d';
                if(!ms(options.huntConfig.cooldown)) options.huntConfig.cooldown = '1d';

                if(!options.huntConfig.maxAmount) options.huntConfig.maxAmount = 1000;
                if(typeof options.huntConfig.maxAmount != 'number') options.huntConfig.maxAmount = 1000;
                if(options.huntConfig.maxAmount < 1) options.huntConfig.maxAmount = 1000;
            }
        }

        return options;
    }

    getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1)) + Math.floor(min);
    }

    getRandomString(strings: string[]): string {
        return strings[Math.floor(Math.random() * strings.length)];
    }
}

export = UtilsManager;