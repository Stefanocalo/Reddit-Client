export const randomNumber = () => {
    const rnd = Math.floor(Math.random() * 50);
    const result = 100 + rnd;
    return result;
 }