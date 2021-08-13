export interface DiceData {
    status: boolean;
    guildID: string;

    data: {
        user: {
            id: string;
            balance: number;
            percent: number;
            bet: number;
        }

        game: {
            result: string | null;
            type: string;
            percent: number;
            reward: number;
            coefficient: number;
        }
    }
}

export interface CoinflipData {
    status: boolean;
    guildID: string;

    data: {
        user: {
            id: string;
            balance: number;
            bet: number;
            type: string;
        }

        game: {
            result: string | null;
            type: string | null;
            reward: number;
        }
    }
}

export interface RouletteData {
    status: boolean;
    guildID: string;
    
    data: {
        user: {
            id: string;
            balance: number;
            color: string;
            bet: number;
        }

        game: {
            result: string | null;
            color: string | null;
            reward: number;
        }
    }
}

export interface FishData {
    status: boolean;
    guildID: string;

    data: {
        user: {
            id: string;
            balance: number;
        }

        game: {
            fish: string;
            reward: number;
        }

        time: {
            value: number;
            pretty: {
                days: number;
                hours: number;
                minutes: number;
                seconds: number;
            }
        }
    }
}

export interface HuntData {
    status: boolean;
    guildID: string;

    data: {
        user: {
            id: string;
            balance: number;
        }

        game: {
            hunt: string;
            reward: number;
        }

        time: {
            value: number;
            pretty: {
                days: number;
                hours: number;
                minutes: number;
                seconds: number;
            }
        }
    }
}