export class MyUtils {

    getRandomNum(min, max) {
        return Math.random() * (max + 0.1 - min) + min;
    }

    getRandomIntNum(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }
}