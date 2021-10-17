export class Email {
    constructor(email) {
        validate(email);
        this.email = email;
    }

    static validate(email) {
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            throw new Error('E-mail inválido');
        }
    }
}