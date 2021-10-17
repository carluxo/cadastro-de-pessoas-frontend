export class ValueTest {
    static isEmpty(value) {
        return !value;
    }

    static dateIsIntheFuture(value) {
        let date = value;
        
        if (!(date instanceof Date)) {
            date = new Date(date);
        } 

        return date > new Date();
    }
}