function parse(value: string | number): { days: number, hours: number, minutes: number, seconds: number } {
    const valueType = typeof value;

    switch(valueType) {
        case 'string': {
            const filteredValue = Number(value);
            if(filteredValue === undefined) throw new TypeError('Invalid time format.');

            return {
                days: Math.trunc(filteredValue / 86400000),
                hours: Math.trunc(filteredValue / 3600000) % 24,
                minutes: Math.trunc(filteredValue / 60000) % 60,
                seconds: Math.trunc(filteredValue / 1000) % 60
            }
        }

        case 'number': {
            const filteredValue = (value as number);

            return {
                days: Math.trunc(filteredValue / 86400000),
                hours: Math.trunc(filteredValue / 3600000) % 24,
                minutes: Math.trunc(filteredValue / 60000) % 60,
                seconds: Math.trunc(filteredValue / 1000) % 60
            }
        }
    }
}

export = parse;