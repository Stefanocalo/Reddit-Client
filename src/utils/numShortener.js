

export const numShortener = (num) => {
    if(num > 1000) {
        const string = `${num/1000}`;
        const numShort = string.slice(0,4);
        const number = `${Number(numShort)}K`;
        return number
    } else {
        return num
    }
}