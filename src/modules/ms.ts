const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;
const weeks = days * 7;
const years = days * 365.25;

function ms(value: string | number, format?: 'short' | 'long'): number {
    const valueType = typeof value;

    switch(valueType) {
        case 'string': {
            const filteredValue = (value as string);

            return parse(filteredValue);
        }

        case 'number': {
            const filteredValue = (value as number);

            return format ? format.includes('short') ? Number(formatShort(filteredValue)) : Number(formatLong(filteredValue)) : 0;
        }
    }
}

function parse(value: string): number {
    if(value.length > 100) return;

    const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(value);

    if(!match) return;

    const float = parseFloat(match[1]);
    const type = (match[2] || 'ms').toLowerCase();

    switch(type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return float * years;

        case 'weeks':
        case 'week':
        case 'w':
            return float * weeks;

        case 'days':
        case 'day':
        case 'd':
            return float * days;

        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return float * hours;

        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return float * minutes;
    
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return float * seconds;

        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return float;

        default:
            return undefined;
    }
}

function formatShort(value: number): string {
    const msAbs = Math.abs(value);

    if(msAbs >= days) {
        return Math.round(value / days) + 'd';
    }else if(msAbs >= hours) {
        return Math.round(value / hours) + 'h';
    }else if(msAbs >= minutes) {
        return Math.round(value / minutes) + 'm';
    }else if(msAbs >= seconds) {
        return Math.round(value / seconds) + 's';
    }

    return value + 'ms';
}

function formatLong(value: number): string {
    const msAbs = Math.abs(value);

    if(msAbs >= days) {
        return plural(value, msAbs, days, 'day');
    }else if(msAbs >= hours) {
        return plural(value, msAbs, hours, 'hour');
    }else if(msAbs >= minutes) {
        return plural(value, msAbs, minutes, 'minute');
    }else if(msAbs >= seconds) {
        return plural(value, msAbs, seconds, 'seconds');
    }

    return value + ' ms';
}

function plural(value: number, msAbs: number, constValue: number, name: string): string {
    const isPlural = msAbs >= constValue * 1.5;

    return Math.round(value / constValue) + ' ' + name + (isPlural ? 's' : '');
}

export = ms;