export class MyUtils {

    getRandomNum(min, max) {
        return Math.random() * (max + 1 - min) + min;
    }

    getRandomIntNum(min, max) {
        return Math.floor(this.getRandomNum(max, min));
    }
}