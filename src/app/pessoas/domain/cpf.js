export class Cpf {
    constructor(cpf) {
        this.validate(cpf)
        this.codigo = cpf;
    }

    static _calcularDigito(value, isSegundoDigito = false) {
        let ate = 9
        let multiplicador = 11;

        if (isSegundoDigito) {
            ate = 10
            multiplicador = 12;
        }

        let soma = 0;
        let resto;

        for (let i = 1; i <= ate; i++)
            soma = soma + parseInt(value[i-1]) * (multiplicador - i);

        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11))
            resto = 0;

        if (resto != parseInt(value[ate]))
            throw new Error("CPF inválido")
    }

    static validate(value) {
        if (!value || value == "00000000000") {
            throw new Error("CPF inválido")
        }

        if (value.replaceAll(/\D/g, '').length !== 11) {
            throw new Error("CPF inválido");
        }

        this._calcularDigito(value, false);
        this._calcularDigito(value, true);
    }
}